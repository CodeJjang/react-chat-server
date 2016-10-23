/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res, next) {
        if (!validateCreateParams(req.body)) {
            return next(new Error('Some parameters are missing.'));
        }

        var author = req.body.author;
        var text = req.body.text;
        var roomId = req.body.roomId;

        var oldNickname = req.session.user.nickname;

        UserService.updateUser({ id: req.session.user.id }, { nickname: author })
            .then(user => {
                if (user.length !== 1) {
                    return Promise.reject(new Error('No user was found or several users were found.'));
                }
                req.session.user = user[0];
                return RoomService.sendComment(user[0], text, roomId);
            })
            .then(comment => {
                res.json(comment);
                return Promise.resolve();
            })
            .then(() => {
                // case user nickname updated
                if (author.localeCompare(oldNickname) !== 0) {
                    console.log('Detected username has changed...');
                    syncUserUpdated(req);
                }
                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });

    },

    find: function(req, res, next) {
        var roomId = req.query.roomId || RoomService.getGlobalRoomId();
        CommentService.findComment({ roomId: roomId })
            .then(comments => {
                res.json(comments);
                return Promise.resolve();
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }
};

function validateCreateParams(body) {
    if (_.isUndefined(body.author) || _.isUndefined(body.text)) {
        return false;
    }

    return true;
}

function syncUserUpdated(req) {
    RoomService.sendUserSyncToAllRooms()
        .catch(err => {
            if (err) {
                console.log('Error in sending sync regarding updated user.');
                console.log(err);
            }
        });
}
