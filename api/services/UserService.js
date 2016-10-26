module.exports.updateUser = function(queryParams, updateParams) {
	console.log('Updating user by: %s, with: %s', JSON.stringify(queryParams), JSON.stringify(updateParams));

    return User.update(queryParams, updateParams);
};

module.exports.createUser = function(currentRoomId) {
	console.log('Creating anonymous user.');

	return User.create({
		currentRoomId: currentRoomId
	});
};

module.exports.findUser = function(params) {
	console.log('Finding user by params:', JSON.stringify(params));
	return User.find(params);
};

module.exports.deleteUser = function(params) {
	return User.destroy(params);
};
