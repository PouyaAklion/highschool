const userController = require('../controllers/userController');
const siteController = require('../controllers/siteController');
const adminController = require('../controllers/adminController');
const {authenticate} = require('../middleware/authenticate');
const {guest} = require('../middleware/guest');
const {global} = require('../middleware/global');
const {admin} = require('../middleware/admin');

module.exports = function (app) {
	//site routes
	app.get('/',global,siteController.home);
	app.get('/login',guest,siteController.login);
	app.post('/login',guest,userController.login);
	app.get('/register',guest,siteController.register);
	app.post('/register',guest,userController.register);
	app.post('/logout',authenticate,userController.logout);

	//admin routes
	app.get('/admin-dashboard',admin,adminController.index);
	app.get('/admin-students',admin,adminController.students);
	app.get('/admin-teachers',admin,adminController.teachers);
	app.post('/admin-teacher-register',admin,adminController.teacherRegister);

	//parent routes
	app.get('/parent-dashboard',authenticate,userController.index);

	app.get('/test', (req, res) => {
		res.render('site/test');
	})
};