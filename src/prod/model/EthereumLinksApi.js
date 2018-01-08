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

import {
  LinksApi,
} from 'prod/model/LinksApi'
import {
  createApiForAddress,
} from 'prod/utils/EthlyApiFactory'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'
import {
  accountConfig,
  apiConfig,
} from 'config'

export default class EthereumLinksApi implements LinksApi {
  api: EthlyApi

  constructor(api: EthlyApi) {
    this.api = api

    let unsafeThis = (this: any)

    unsafeThis.getLinksCount = this.getLinksCount.bind(this)
    unsafeThis.listAllLinks = this.listAllLinks.bind(this)
    unsafeThis.addLink = this.addLink.bind(this)
    unsafeThis.createAddLinkTransaction = unsafeThis.createAddLinkTransaction.bind(this)
    unsafeThis.executeSignedTransaction = unsafeThis.executeSignedTransaction.bind(this)
  }

  static createLinksApi(): Promise<EthereumLinksApi> {
    return createApiForAddress(apiConfig.address, apiConfig.host)
      .then(api => {
        return new EthereumLinksApi(api)
      })
  }

  getLinksCount(): Promise<number> {
    return this.api.getLinksCount()
  }

  listAllLinks(): Promise<Array<LinkSpecification>> {
    return this.api.getAllLinks()
      .then(links => links.map((link, id) => LinkSpecification.fromApiLinkWithId(id.toString(), link)))
  }

  addLink(link: LinkSpecification): Promise<TransactionReceipt> {
    return this.api.addLink(LinkSpecification.toApiLink(link), {
      from: accountConfig.address,
      gas: apiConfig.defaultGas,
    })
  }

  createAddLinkTransaction(link: LinkSpecification, draft: TransactionDraft): Promise<AddLinkTransaction> {
    return Promise.resolve(this.api.createAddLinkTransaction(LinkSpecification.toApiLink(link), draft))
  }

  executeSignedTransaction(transaction: SignedTransaction): Promise<TransactionReceipt> {
    return this.api.executeSignedTransaction(transaction)
  }
}
