const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uuid = require('../middleware/uuid');
const videoService = require('../services/video-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.get('/video/:uuid', (req, res) => {
  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => res.sendStatus(status.OK).json(video))
    .catch(err => res.sendStatus(err.statusCode).json(err.message));
});

controller.delete('/delete/:uuid', (req, res) => {
  videoService
    .deleteVideo(req.params.uuid, req.session.user.id)
    .then(video => res.sendStatus(status.OK).json(video))
    .catch(err => res.sendStatus(err.statusCode).json(err.message));
});

controller.post('/video/upload', (req, res) => {
  const videoObj = {};
  const files = [];
  const fields = [];
  const form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public/upload');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    files.push(file);
  });

  // name - requeired; about - required ; visibility [public, private] required, tag - required
  form.on('field', (name, value) => {
    fields.push({ name, value });
  });

  // log any errors that occur
  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    getUniqueUUID(renameFile);
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

  const getUniqueUUID = callback => {
    const uniqueId = uuid();
    videoService
      .getOneByUUID(uniqueId)
      .then(video => {
        if (video) {
          getUniqueUUID(callback);
        } else {
          files.forEach(file => callback(uniqueId, file));
          videoObj.uuid = uniqueId;
          sendVideoToDB();
        }
      })
      .catch((err) => res.sendStatus(err.statusCode).json(err.message));
  };

  // rename uploaded file with new name
  const renameFile = (uuid, file) => {
    const type = file.type.split('/').pop();
    const ref = file.type.split('/').shift();
    const newName = `${uuid}.${type}`;
    fs
      .rename(file.path, path.join(form.uploadDir, newName), err => {
        if (err) {
          fs.unlink(path.join(form.uploadDir, newName), err => {
            if (err)
              throw {
                message: err,
                statusCode: status.INTERNAL_SERVER_ERROR,
              };
          });
        }
      })
      .catch(err => res.sendStatus(err.statusCode).json(err.message));

    videoObj[ref] = newName;
  };

  const sendVideoToDB = () => {
    videoObj.userId = req.session.user.id;
    videoObj.postDate = new Date().toLocaleDateString();

    for (const field of fields) {
      videoObj[field.name] = field.value;
    }

    videoService
      .addVideo(videoObj)
      .then(res.sendStatus(status.OK))
      .catch(err => res.sendStatus(err.statusCode).json(err.message));
  };
});

module.exports = controller;