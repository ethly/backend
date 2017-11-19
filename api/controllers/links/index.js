// @flow

import {
  LinksController,
} from 'api/controllers/links/LinksController'
import {
  LinksControllerProduction,
} from 'api/controllers/links/LinksControllerProduction'
import {
  LinksControllerTesting,
} from 'api/controllers/links/linksControllerTesting'

export const linksController: LinksController =
  process.env.NODE_ENV === 'production'
    ? new LinksControllerProduction()
    : new LinksControllerTesting()
