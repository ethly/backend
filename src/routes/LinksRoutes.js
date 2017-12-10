// @flow

import type {
  $Application,
} from 'express'

import {
  linksController,
} from 'controllers/index'

module.exports = (app: $Application) => {
  app.route('/links')
    .get(linksController.listAllLinks)
    .post(linksController.createLink)

  app.route('/links/:linkId')
    .delete(linksController.deleteLink)
}
