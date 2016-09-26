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
        var newUser;
        UserService.findOrCreateUser(author, text)
            .then((user) => {
                newUser = user;
                return CommentService.createComment(user, author)
            })
            .then((comment) => {
                comment.author = newUser;
                res.json(comment);
                return Promise.resolve();
            })
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