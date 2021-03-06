const { User } = require('../models/user');
let authenticate = function (req, res, next) {
	let token = req.cookies.access_token;
	User.findByToken(token).then((user) => {
		req.user = user;
		req.token = token;
		next();
	}).catch(e => {
		res.redirect('/');
	})
}
module.exports = {
	authenticate
}