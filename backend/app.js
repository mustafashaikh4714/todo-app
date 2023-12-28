const express = require('express')
const AppError = require('./utils/AppError')
const errorHandler = require('./middleware/errorHandler')
const { status } = require('./common')
const { user, todo } = require('./routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

user(app)
todo(app)

app.use((request, response) => {
  console.log('url', request.url)
  throw new AppError(status.NOT_FOUND, 'Not Found!')
})
app.use(errorHandler)

module.exports = { app }
