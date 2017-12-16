// @flow

import EthlyApi, {
  eth,
} from 'ethly-api'

const {
  TransactionDraft,
  TransactionReceipt,
  SignedTransaction,
  AddLinkTransaction,
} = eth

import EthereumLinksApi from 'prod/model/EthereumLinksApi'
import LinksStorageProd from 'prod/model/LinksStorageProd'
import {
  LinksApi,
} from 'prod/model/LinksApi'
import {
  createApiForAddress,
} from 'prod/utils/EthlyApiFactory'
import {
  addresses,
} from 'prod/utils/Config'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export default class EthereumLinksApiCached implements LinksApi {
  api: LinksApi
  cache: LinksStorageProd


  constructor(api: LinksApi) {
    this.api = api
    this.cache = new LinksStorageProd()
  }

  getLinksCount(): Promise<number> {
    return this.api.getLinksCount()
  }

  listAllLinks(): Promise<Array<LinkSpecification>> {
    return Promise.all([this.api.getLinksCount(), this.cache.linksCount()])
      .then(counts => {
        const apiLinks = counts[0]
        const cacheLinks = counts[1]

        if (apiLinks === cacheLinks) {
          return this.cache.getAllLinks()
        } else {
          return this.api.listAllLinks()
            .then(links => this.cache.storeNewLinks(links)
              .then(() => Promise.resolve(links)))
        }
      })
  }

  addLink(link: LinkSpecification): Promise<TransactionReceipt> {
    return this.api.addLink(link)
  }

  createAddLinkTransaction(link: LinkSpecification, draft: TransactionDraft): Promise<AddLinkTransaction> {
    return this.api.createAddLinkTransaction(link, draft)
  }

  executeSignedTransaction(transaction: SignedTransaction): Promise<TransactionReceipt> {
    return this.api.executeSignedTransaction(transaction)
  }
}