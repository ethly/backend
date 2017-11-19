// @flow
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import routes from 'api/routes/linksRoutes'

const app = express()
const port = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/LinksTempDB')

app.use((req: $Subtype <express$Request>, res: express$Response, next: express$NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())

routes(app) // register the route

app.listen(port)

console.log('Links RESTful API server started on: ' + port)
