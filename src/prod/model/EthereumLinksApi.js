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

export default class EthereumLinksApi implements LinksApi {
  api: EthlyApi

  constructor(api: EthlyApi) {
    this.api = api
  }

  static createLinksApi(): Promise<EthereumLinksApi> {
    return createApiForAddress('0x66F4185b8CD92d0e3A95f8d73388a445e1d3249e', 'http://localhost:8545')
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
      from: '0x4Eb84C3BCc0c1C4Cc9d90b415D9FE42532Fe9AdC',
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
