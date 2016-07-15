const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	passsword: String
});

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;