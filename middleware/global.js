const { User } = require('../models/user');
let global = function (req, res, next) {
	req.locale = 'fa';
	let token = req.cookies.access_token;
	if (token) {
		User.findByToken(token).then((user) => {
			req.user = user;
			req.token = token;
			next();
		}).catch(e => {
			next();
		})
	} else {
		next();
	}

}
module.exports = {
	global
}