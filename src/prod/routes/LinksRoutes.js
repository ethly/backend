// @flow

import type {
  $Application,
} from 'express'

import {
  linksControllerPromise,
} from 'prod/controllers/index'

export default function(app: $Application) {
  linksControllerPromise.then(controller => {
    app.route('/links')
      .get(controller.listAllLinks)
      .post(controller.createLink)

    app.route('/links/signed')
      .post(controller.createAddLinkTransaction)

    app.route('/links/execute')
      .post(controller.executeSignedTransaction)
  })
}
