// @flow

import type {
  $Application,
} from 'express'

import {
  LinksControllerTesting,
} from 'staging/LinksControllerTesting'
import {
  linksControllerPromise,
} from 'controllers/index'

export default function(app: $Application) {
  linksControllerPromise.then(controller => {
    app.route('/links')
      .get(controller.listAllLinks)
      .post(controller.createLink)

    app.route('/links/signed')
      .post(controller.createAddLinkTransaction)

    app.route('/links/execute')
      .post(controller.executeSignedTransaction)

    if (process.env.NODE_ENV === 'development') {
      const ctrl = ((controller: any): LinksControllerTesting)
      app.route('/links/:linkId').delete(ctrl.deleteLink)
    }
  })
}
