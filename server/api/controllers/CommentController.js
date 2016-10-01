/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res, next) {
        // if(!req.isSocket()){
        //     return res.badRequest();
        // }
        if (!validateParams(req.body)) {
            next(new Error('Some parameters are missing.'));
        }

        var author = req.body.author;
        var text = req.body.text;
        var newUser;
        UserService.findOrCreateUser(author, text)
            .then((user) => {
                newUser = user;
                return CommentService.createComment(user, text)
            })
            .then((comment) => {
                comment.author = newUser;
                res.json(comment);
                return Promise.resolve();
            })
            .then(RoomService.sendSyncToGlobalRoom)
            .catch((err) => {
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
