/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res, next) {
        if (!validateCreateParams(req.body)) {
            next(new Error('Some parameters are missing.'));
        }

        var author = req.body.author;
        var text = req.body.text;
        var room = req.body.room;

        UserService.updateUser(req.session.user.id, author)
            .then((user) => {
                if (user.length == 0) {
                    return Promise.reject(new Error('No user was found.'));
                }
                return RoomService.sendComment(user[0], text, room);
            })
            .then((comment) => {
                res.json(comment);
                return Promise.resolve();
            })
            .then(() => {
                // case user nickname updated
                if (author.localeCompare(req.session.user.nickname) !== 0) {
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
        CommentService.findComment()
            .then((comments) => {
                res.json(comments);
                return Promise.resolve();
            })
            .catch((err) => {
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
    RoomService.findRoom({
            id: req.session.user.currentRoomId
        })
        .then((room) => {
            if(room && room.length === 1) {
                return RoomService.sendUserSyncToRoom(room[0].name);    
            }
            
            return Promise.reject(new Error('User\'s room was not found or found too many.'));
        })
        .catch((err) => {
            if (err) {
                console.log('Error in sending sync regarding updated user.');
                console.log(err);
            }
        });
}
