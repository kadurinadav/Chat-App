const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
    min: 2
},
email: {
    type: String,
    required: true,
    unique: false,
},
password: {
    type: String,
    required: true,
},
isAvatarImageSet: {
    type: Boolean,
    default: false
},
avatarImage: {
    type: String,
    default: ""
}
});

// Create user model
const User = mongoose.model('User', userSchema);

module.exports = User;