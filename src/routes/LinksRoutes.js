// @flow

import type {
  $Application,
} from 'express'

import {
  linksControllerPromise,
} from 'controllers/index'

module.exports = (app: $Application) => {
  linksControllerPromise.then(controller => {
    app.route('/links')
      .get(controller.listAllLinks)
      .post(controller.createLink)

    app.route('/links/:linkId')
      .delete(controller.deleteLink)
  })
}
