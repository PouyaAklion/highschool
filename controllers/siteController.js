let register = function(req,res){
	res.render('auth/register');
}
let login = function(req,res) {
	res.render('auth/login');
}
let home = function(req,res){
	let user = req.user;
	res.render('site/home',{user});
}
let post = function(req,res){
	res.render('site/post');
}

module.exports = {
	home,
	login,
	register

}