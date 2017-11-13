// @flow

import linksController from '../controllers/linksController'
import type {$Application, } from 'express'

module.exports = (app: $Application) => {
  // links Routes
  app.route('/links')
    .get(linksController.listAllLinks)
    .post(linksController.createLink)

  app.route('/links/:linkId')
    .get(linksController.readLink)
    .delete(linksController.deleteLink)
}
