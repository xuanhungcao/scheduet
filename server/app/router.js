const express    = require('express')
const user       = require('./models/user')
const passport   = require('passport')

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

    apiRoutes.get('/users/:username', requireAuth, apiController.getProfile)
    apiRoutes.get('/schedules', requireAuth, apiController.getSchedule)
    apiRoutes.get('/notes', requireAuth, apiController.getNote)

    apiRoutes.post('/notes', requireAuth, apiController.newNote)
    apiRoutes.put('/notes', requireAuth, apiController.modifyNote)
    apiRoutes.delete('/notes/:noteId', requireAuth, apiController.deleteNote)
}
