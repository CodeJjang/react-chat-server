/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res, next) {
        if (!validateParams(req.body)) {
            next(new Error('Some parameters are missing.'));
        }

        var author = req.body.author;
        var text = req.body.text;
        var room = req.body.room;
        
        UserService.updateUser(req.session.userId, author)
            .then((user) => {
                if(user.length == 0) {
                    return Promise.reject(new Error('No user was found.'));
                }
                return RoomService.sendComment(user[0], text, room);
            })
            .then((comment) => {
                res.json(comment);
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

function validateParams(body) {
    if (_.isUndefined(body.author) || _.isUndefined(body.text)) {
        return false;
    }

    return true;
}
