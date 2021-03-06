const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

// ecrypt password
userSchema.pre('save', function(next) {
	const user = this;
	
	bcrypt.genSalt(10, function(err, salt){
		if (err) { return next(err) };

		bcrypt.hash(user.password, salt, null, function(err, hash) {
		  if (err) { return next(err) };
		  
		  user.password = hash;
		  next();	
		});
	});
});

userSchema.methods.comparePassword = function(submitPass, cb) {
	bcrypt.compare(submitPass, this.password, function(err, isMatch) {
		if (err)	{ return cb(err) };
		
		cb(null, isMatch);
	});
}

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;