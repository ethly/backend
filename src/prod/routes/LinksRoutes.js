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
      .post(controller.createAddLinkTransaction)

    app.route('/links/hashtags/:hashtag')
      .get(controller.listLinksByHashtag)

    app.route('/links/testing')
      .get(controller.listAllLinks)
      .post(controller.createLink)

    app.route('/execute')
      .post(controller.executeSignedTransaction)
  })
}
