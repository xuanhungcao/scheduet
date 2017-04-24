const mongoose = require('mongoose')
const bcrypt   = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  role    : String,
  info    : mongoose.Schema.Types.Mixed,
});

userSchema.methods.validPassword = (self, password) => {
    try {
        var res = bcrypt.compareSync(password, self.password)
    } catch(e) {
        console.log(e.red)
        return
    }
    return res
}

userSchema.methods.encrypt = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = mongoose.model('users', userSchema);
