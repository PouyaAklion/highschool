const mongoose = require('mongoose');
const url = process.env.url || 'mongodb://localhost/highschool';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });

module.exports = {
	mongoose
}