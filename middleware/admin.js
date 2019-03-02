const { User } = require('../models/user');
let admin = function (req, res, next) {
	let token = req.cookies.access_token;
	User.findByToken(token).then((user) => {
		
		if(user.role !== 'admin'){
			throw new Error();
		}
		req.user = user;
		req.token = token;
		next();
	}).catch(e => {
		res.redirect('/');
	})
}
module.exports = {
	admin
}