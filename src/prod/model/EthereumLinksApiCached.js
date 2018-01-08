// @flow

import {
  eth,
} from 'ethly-api'

const {
  TransactionDraft,
  TransactionReceipt,
  SignedTransaction,
  AddLinkTransaction,
} = eth

import LinksStorageProd from 'prod/model/LinksStorageProd'
import {
  LinksApi,
} from 'prod/model/LinksApi'
import {
  createApiForAddress,
} from 'prod/utils/EthlyApiFactory'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

/**
 * Wrapper for backend api with in-memory caching of links.
 */
export default class EthereumLinksApiCached implements LinksApi {
  api: LinksApi
  cache: LinksStorageProd

  constructor(api: LinksApi) {
    this.api = api
    this.cache = new LinksStorageProd()


    let unsafeThis = (this: any)

    unsafeThis.getLinksCount = this.getLinksCount.bind(this)
    unsafeThis.listAllLinks = this.listAllLinks.bind(this)
    unsafeThis.addLink = this.addLink.bind(this)
    unsafeThis.createAddLinkTransaction = unsafeThis.createAddLinkTransaction.bind(this)
    unsafeThis.executeSignedTransaction = unsafeThis.executeSignedTransaction.bind(this)
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