const mongoose = require('mongoose');
const validator = require('validator');
let PostSchema = new mongoose.Schema({
	title:{
		type:String,
		required:[true,'post title required'],
		trim:true,
		minlength:5,
		maxlength:80,
	},
	content:{
		type:String,
		required:[true,'post content required']
	},
	imageUrl:{
		type:String,
		required:[true,'post image required']
	}
})
let Post = new mongoose.model('Post',PostSchema);
module.exports = {
	Post
}