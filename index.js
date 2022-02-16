require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { dbConection } = require('./database/config.js')
const app = express()

app.use(cors())

app.use(express.json())
//dbconection();
// data of mongodb
// user: admin_users
// password: HbHMxbmSs2Fk9Aaz

dbConection();

app.use('/users',require('./routes/user-routes'))
app.use('/coins',require('./routes/coin-routes'))
app.use('/country',require('./routes/country-routes'))

app.listen(8080)