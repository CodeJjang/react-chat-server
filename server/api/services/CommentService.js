module.exports.createComment = function(user, text) {
	console.log('Creating comment:', user.nickname, text);

	return Comment.create({
		author: user.nickname,
		text: text
	});
};

module.exports.findComment = function(params) {
	return Comment.find(params);
}