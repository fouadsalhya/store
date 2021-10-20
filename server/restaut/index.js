const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// importer les middlewares
app.use(express.json()); 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())


// importer les routes
const foods = require('./routes/foods')
const auth = require('./routes/auth')
const users = require('./routes/users')
const braintree = require('./routes/braintree')
const orders = require('./routes/orders')

app.use('/api/foods',foods);
app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/braintree',braintree)
app.use('/api/orders',orders)


// la connexion avec la base de donne mongodb
mongoose.connect(process.env.DATABASE)
        .then(() => console.log('connect ...'))
        .catch((err) => console.error(err))

// le serveur de l'application
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listen to port ${port} ...`))
