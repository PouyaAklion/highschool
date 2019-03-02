let guest = function (req,res,next) {
	let token = req.cookies.access_token;
	if(!token){
		next();
	}else{
		res.redirect('/');
	}
}
module.exports = {
	guest
}