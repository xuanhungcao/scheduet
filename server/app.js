const express        = require('express')
const app            = express()
const port           = process.env.PORT || 3000
const mongoose       = require('mongoose')
const session        = require('express-session')
const bodyParser     = require('body-parser')
const cookieParser   = require('cookie-parser')
const cors           = require('cors')
const passport       = require('passport')
const configDB       = require('./app/config/database')
const configMain     = require('./app/config/main')
const morgan         = require('morgan')

mongoose.Promise = require('bluebird')

if (configMain.test == 'local')
    mongoose.connect(configDB.localAddress)
else
    mongoose.connect(configDB.serverAddress)
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret : configMain.secret,
    resave : true,
    proxy  : true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use('assets', express.static(__dirname + '/public'))
app.use(cors({ origin: '*' }))

require('./app/router')(app, passport)
require('./app/config/passport')(app)

app.listen(port)



