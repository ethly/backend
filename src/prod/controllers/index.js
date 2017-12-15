// @flow

import EthereumLinkApi from 'prod/model/EthereumLinksApi'
import EthereumLinkApiCached from 'prod/model/EthereumLinksApiCached'
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
        return new LinksControllerImpl(new EthereumLinkApiCached(api))
      })
    : Promise.resolve(new LinksControllerImpl(new DbLinkApi()))
