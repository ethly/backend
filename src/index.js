// @flow
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import routes from './api/routes/linksRoutes'

// greetings();

const app = express()
const port = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/LinksTempDB')

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

routes(app) // register the route

app.listen(port)

console.log('Links RESTful API server started on: ' + port)
