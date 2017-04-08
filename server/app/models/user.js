const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  role    : String,
  info    : mongoose.Schema.Types.Mixed,
});

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(this.password, password)
}

userSchema.methods.encrypt = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

module.exports = mongoose.model('users', userSchema);
