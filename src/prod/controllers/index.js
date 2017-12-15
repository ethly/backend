// @flow

import EthereumLinkApi from 'prod/model/EthereumLinksApi'
import DbLinkApi from 'staging/DbLinksApi'
import {
  LinksController,
} from 'prod/controllers/LinksController'
import {
  LinksControllerImpl,
} from 'prod/controllers/LinksControllerImpl'

export const linksControllerPromise: Promise<LinksController> =
  process.env.NODE_ENV === 'production'
    ? EthereumLinkApi.createLinksApi()
      .then(api => {
        console.log('Api created')
        return new LinksControllerImpl(api)
      })
    : Promise.resolve(new LinksControllerImpl(new DbLinkApi()))
