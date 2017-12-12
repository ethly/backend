// @flow

import EthlyApi, {
  eth,
  Link,
} from 'ethly-api'

const {
  TransactionReceipt,
} = eth

import {
  createApiForAddress,
} from 'prod/utils/EthlyApiFactory'
import {
  addresses,
} from 'prod/utils/Config'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export default class EthereumLinksApi {
  api: EthlyApi

  constructor(api: EthlyApi) {
    this.api = api
  }

  static createLinksApi(): Promise<EthereumLinksApi> {
    return createApiForAddress(addresses.contract, 'http://localhost:8545')
      .then(api => new EthereumLinksApi(api))
  }

  getLinksCount(): Promise<number> {
    return this.api.getLinksCount()
  }

  listAllLinks(): Promise<Array<LinkSpecification>> {
    return this.api.getAllLinks()
      .then(links => links.map((link, id) => new LinkSpecification(
        id.toString(),
        link.label,
        link.url,
        link.description,
        link.hashtags,
        link.timestamp
      )))
  }

  addLink(link: LinkSpecification): Promise<TransactionReceipt> {
    return this.api.addLink(new Link(
      link.url,
      link.label,
      link.description,
      link.hashtags
    ), {
      from: addresses.account,
      gas: 2100000,
    })
  }
}
