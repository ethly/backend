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
      .then(links => links.map((link, id) => LinkSpecification.fromApiLinkWithId(id.toString(), link)))
  }

  addLink(link: LinkSpecification): Promise<TransactionReceipt> {
    return this.api.addLink(LinkSpecification.toApiLink(link), {
      from: addresses.account,
      gas: 2100000,
    })
  }

  createAddLinkTransaction(link: LinkSpecification, draft: TransactionDraft): Promise<AddLinkTransaction> {
    return Promise.resolve(this.api.createAddLinkTransaction(LinkSpecification.toApiLink(link), draft))
  }

  executeSignedTransaction(transaction: SignedTransaction): Promise<TransactionReceipt> {
    return this.api.executeSignedTransaction(transaction)
  }
}
