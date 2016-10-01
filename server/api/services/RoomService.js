var _globalRoomName = 'globalRoom',
	_syncEventName = 'sync';

module.exports.joinGlobalRoom = function(req, cb) {
	sails.sockets.join(req, _globalRoomName, cb);
}

module.exports.sendSyncToGlobalRoom = function() {
	sails.sockets.broadcast(_globalRoomName, _syncEventName);
	return Promise.resolve();
}