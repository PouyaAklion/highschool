const userController = require('../controllers/userController');
const siteController = require('../controllers/siteController');
const {authenticate} = require('../middleware/authenticate');
const {guest} = require('../middleware/guest');
const {global} = require('../middleware/global');

module.exports = function (app) {
	app.get('/',global,siteController.home);
	app.get('/login',guest,siteController.login);
	app.post('/login',guest,userController.login);
	app.get('/register',guest,siteController.register);
	app.post('/register',guest,userController.register);
	app.post('/logout',authenticate,userController.logout);
	app.get('/parent-dashboard',authenticate,userController.index);

	app.get('/test', (req, res) => {
		res.render('site/test');
	})
};