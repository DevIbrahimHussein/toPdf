// laod express
const express = require('express')
// load app
const app = express()

require('dotenv').config()
// load database
const databaseConnection = require('./src/database.config') 

const apis = require('./src/routes')

// connect to db
databaseConnection()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apis)
app.use('*', (_, res) => { res.sendStatus(404) })

app.listen(
  process.env.PORT,
  () => {
    console.log(`GradeHero is running on port ${process.env.PORT}`)
  }
)