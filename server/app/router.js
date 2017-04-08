const express    = require('express');
const user       = require('./models/user');
const passport   = require('passport');
const jwt        = require('jsonwebtoken')

const apiController  = require('./controllers/api');
const authController = require('./controllers/authentication');

const requireLogin  = passport.authenticate('local', {session : false})
const requireAuth   = passport.authenticate('jwt', {session: false})

module.exports = function(app, passport) {

  const apiRoutes = express.Router()

  app.get('/', (req, res) => res.json({status : 200}) )
  app.post('/register', authController.register)
  app.post('/login', requireLogin, authController.login)

  app.use('/api', apiRoutes)
}
