const express    = require('express')
const user       = require('./models/user')
const passport   = require('passport')

const apiController  = require('./controllers/api');
const authController = require('./controllers/authentication');

const requireLogin  = passport.authenticate('local', {session : false})
const requireAuth   = passport.authenticate('jwt', {session: false})

const path = require('path')

module.exports = function(app, passport) {
    const apiRoutes = express.Router()

    app.get('/', (req, res) => res.json({status : 200}) )
    app.get('/docs', (req, res) => res.sendFile(path.join(__dirname, '../docs/index.html')))
    app.post('/register', authController.register)
    app.post('/login', requireLogin, authController.login)

    app.use('/api', apiRoutes)

    apiRoutes.get('/users/:username', requireAuth, apiController.getProfile)
    apiRoutes.post('/users/:username', requireAuth, apiController.putProfile)

    apiRoutes.get('/events', requireAuth, apiController.getEvent)
    apiRoutes.post('/events', requireAuth, apiController.postEvent)
    apiRoutes.put('/events', requireAuth, apiController.putEvent)
    apiRoutes.delete('/events', requireAuth, apiController.deleteEvent)
}
