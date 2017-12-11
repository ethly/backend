// @flow

import {
  LinksController,
} from 'controllers/LinksController'
import {
  LinksControllerProduction,
} from 'prod/controllers/LinksControllerProduction'
import {
  LinksControllerTesting,
} from 'staging/LinksControllerTesting'

export const linksControllerPromise: Promise<LinksController> =
  process.env.NODE_ENV === 'production'
    ? LinksControllerProduction.createController()
    : LinksControllerTesting.createController()
