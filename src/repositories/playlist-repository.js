const db = require("../config/db");

const query = {
  savePlaylist(playlist) {
    return db.insertObj(
      "INSER INTO playlists(name, user_id, visibility) VALUES(?,?,?)", [
        playlist.name,
        playlist.userId,
        playlist.visibility
      ]
    )
  },
  findOwnPlaylist(id, userId) {
    return db.getSingleResult(
      "SELECT * FROM playlists as p  " +
      "WHERE p.id = ? AND p.userId = ?", [id, userId]
    )
  },
  findById(id) {
    return db.getSingleResult(id)(
      "SELECT * FROM playlist AS p WHERE p.id = ?", id
    )
  },
  findByUserId(userId) {
    return db.getMultipleResult(userId)(
      "SELECT * FROM playlist AS p WHERE p.userId = ? AND p.visibility = public", userId
    )
  },
  deletePlaylist(id, userId){
    return db.deleteObj(
      "DELETE FROM playlist AS p WHERE p.id = ? AND p.user_id = ?", [id, userId]
    )
  }

};


module.exports = query;