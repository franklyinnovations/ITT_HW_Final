angular.module('app').factory('dataService', [
  '$http',
  'Upload',
  // --------API-----------
  function($http, Upload) {
    return {
      getVideo,
      aboutAuthor,
      uploadVideo,
      uploadContinueVideo,
      getInitData,
      addComment,
      getCommentsToVideo,
      setCommentLike,
      searchVideoByTag,
      setVideoLike,
    };
    // -------------------

    function searchVideoByTag(tag) {
      const url = `/api/search`;
      return $http.post(url, { type: 'tag', query: tag }).then(res => {
        if (Array.isArray(res.data)) {
          res.data = res.data.map(x => {
            x.percent = Math.round(
              100 * (x.likesCount || 0) / (x.likesCount + x.dislikesCount || 1),
            );
            return x;
          });
        }
        return res;
      });
    }

    function checkFields(url, resData, fields) {
      fields.forEach(field => {
        if (!Reflect.has(resData, field))
          throw new Error(`No field "${field}" in response "${url}"`);
      });
    }

    function aboutAuthor(userId) {
      const url = `/user/${userId}`;
      return $http.get(url).then(res => {
        checkFields(url, res.data, [
          'id',
          'name',
          'views',
          'videos',
          'likes',
          'dislikes',
        ]);

        const sum = res.data.likes + res.data.dislikes;
        if (sum)
          this.aboutAuthor.percent = Math.floor(res.data.likes * 100 / sum);
        else res.data.percent = 0;

        return res.data;
      });
    }

    function getVideo(uuid) {
      const url = `/video/${uuid}`;
      return $http.get(url).then(res => {
        checkFields(url, res.data, [
          'id',
          'userId',
          'name',
          'about',
          'tag',
          'playCount',
          'likeSign',
          'dislikeSign',
          'likesCount',
          'dislikesCount',
          'highQuality',
          'lowQuality',
          'image',
          'duration',
          'uuid',
        ]);

        // res.data.likeSign = 1;
        res.data.percent = Math.round(
          100 *
            (res.data.likesCount || 0) /
            (res.data.likesCount + res.data.dislikesCount || 1),
        );
        return res.data;
      });
    }

    function getInitData() {
      // window.$http = $http;
      const url = `/main`;
      return $http.get(url).then(res => {
        // checkFields(url, res.data, [
        //   'user_id',
        //   'name',
        //   'about',
        //   'tag',
        //   'playCount',
        //   'likeSign',
        //   'dislikeSign',
        //   'likesCount',
        //   'dislikesCount',
        //   'highQuality',
        //   'lowQuality',
        //   'image',
        //   'duration',
        //   'uuid',
        // ]);

        return res;
      });
    }

    function uploadVideo(data) {
      return Upload.upload({
        url: '/upload',
        method: 'POST',
        data,
      });
    }

    function uploadContinueVideo(data) {
      return Upload.upload({
        url: '/upload/continue',
        method: 'POST',
        data,
      });
    }

    function addComment({ uuid, text }) {
      // console.log
      return $http.put(`/${uuid}/add-comment`, { text });
    }

    function getCommentsToVideo(uuid, sortType) {
      // array of
      // "id": 4,
      // "text": "asdfasdf",
      // "likesCount": 0,
      // "dislikesCount": 0,
      // "postDate": "2018-5-22",
      // "likeSign": null
      if (sortType === 'id')
        return $http.get(`/${uuid}/comments`).then(({ status, data }) => {
          if (Array.isArray(data)) data.sort((a, b) => b.id - a.id);
          return { status, data };
        });

      if (sortType === 'likes')
        return $http.get(`/${uuid}/comments`).then(({ status, data }) => {
          if (Array.isArray(data))
            data.sort(
              (a, b) =>
                b.likesCount -
                b.dislikesCount -
                (a.likesCount - a.dislikesCount),
            );
          return { status, data };
        });

      return $http.get(`/${uuid}/comments`);
    }

    function setCommentLike({ commentId, uuid, type, likeSign, dislikeSign }) {
      if (type === -1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/dislike/true`);
      }
      if (type === -1 && likeSign === 0 && dislikeSign === 1) {
        return $http.put(`/${uuid}/${commentId}/dislike/false`);
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 0) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/true`));
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/false`));
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/like/true`);
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/dislike/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/like/true`));
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/like/false`);
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/false`));
      }

      throw new Error('bad notation');
    }

    function setVideoLike({ uuid, type, likeSign, dislikeSign }) {
      console.log(uuid, type, likeSign, dislikeSign);
      if (type === -1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/dislike/true`);
      }
      if (type === -1 && likeSign === 0 && dislikeSign === 1) {
        return $http.put(`/${uuid}/dislike/false`);
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 0) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/true`));
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/false`));
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/like/true`);
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/dislike/false`)
          .then(() => $http.put(`/${uuid}/like/true`));
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 0) {
        return $http.put(`/${uuid}/like/false`);
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/false`));
      }

      throw new Error('bad notation');
    }
    // -------------------
  },
]);
