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

export const linksController: LinksController =
  process.env.NODE_ENV === 'production'
    ? new LinksControllerProduction()
    : new LinksControllerTesting()
