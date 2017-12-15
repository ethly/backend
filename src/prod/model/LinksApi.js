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

import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export interface LinksApi {

  getLinksCount(): Promise<number>;

  listAllLinks(): Promise<Array<LinkSpecification>>;

  addLink(link: LinkSpecification): Promise<TransactionReceipt>;

  createAddLinkTransaction(link: LinkSpecification, draft: TransactionDraft): Promise<AddLinkTransaction>;

  executeSignedTransaction(transaction: SignedTransaction): Promise<TransactionReceipt>;
}
