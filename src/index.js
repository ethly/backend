// @flow
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import routes from 'routes/LinksRoutes'
import {
  deployContract,
} from 'prod/utils/EthlyApiFactory'
import {
  addresses,
} from 'prod/utils/Config'

if (process.argv[2] === 'deploy') {
  deployNewContract()
} else {
  setupApp()
  setupMongoose()
}

function setupApp(): express$Application {
  const app = express()
  const port = process.env.PORT || 3000

  app.use((req: $Subtype<express$Request>, res: express$Response, next: express$NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(bodyParser.urlencoded({ extended: true, }))
  app.use(bodyParser.json())

  routes(app) // register the route

  app.listen(port)

  console.log('API server started on: ' + port)

  return app
}

function setupMongoose() {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/LinksTempDB')
}

function deployNewContract() {
  console.log('Deploy started')
  deployContract(addresses.account, 'http://localhost:8545').then(api => {
    console.log('Contract address: ', api.getContractAddress())
  })
    .catch(error => {
      console.log(error)
    })
}
