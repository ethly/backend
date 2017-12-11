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

    if (process.env.NODE_ENV === 'development') {
      const ctrl = ((controller: any): LinksControllerTesting)
      app.route('/links/:linkId').delete(ctrl.deleteLink)
    }
  })
}
