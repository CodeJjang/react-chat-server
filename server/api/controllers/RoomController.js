/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    joinGlobalRoom: function(req, res, next) {
        if (!req.isSocket) {
            return res.badRequest();
        }

        RoomService.joinGlobalRoom(req, function(err) {
            if (err) {
                return res.serverError(err);
            }

            console.log('Someone joined global room.');
            return res.ok();
        });
    }
};
