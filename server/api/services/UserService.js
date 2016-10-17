module.exports.updateUser = function(queryParams, updateParams) {
	console.log('Updating user by: %s, with: %s', queryParams, updateParams);

    return User.update(queryParams, updateParams);
};

module.exports.createUser = function(currentRoomId) {
	console.log('Creating anonymous user.');

	return User.create({
		currentRoomId: currentRoomId
	});
};

module.exports.findUser = function(params) {
	return User.find(params);
};

module.exports.deleteUser = function(params) {
	return User.destroy(params);
};
