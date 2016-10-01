module.exports.createComment = function(user, text) {
	console.log('Creating comment:', user.nickname, text);

	return Comment.create({
		author: user,
		text: text
	});
};