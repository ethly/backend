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
  LinksApi,
} from 'prod/model/LinksApi'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'
import Link from 'staging/LinkDbModel'

const date = new Date()

export default class DbLinksApi implements LinksApi {
  getLinksCount(): Promise<number> {
    return this.listAllLinks().then(links => links.length)
  }

  listAllLinks(): Promise<Array<LinkSpecification>> {
    return Link.find({}, (err: string, links: Array<LinkSpecification>) => {
      if (err) {
        return Promise.reject(new Error('Could not list links'))
      } else {
        return Promise.resolve(links)
      }
    })
  }

  addLink(link: LinkSpecification): Promise<TransactionReceipt> {
    link.timestamp = date.getTime()

    const dbLink = new Link(link)
    return dbLink.save((err: string, link: string) => {
      if (err) {
        return Promise.reject(new Error('Could not add link'))
      } else {
        return Promise.resolve(link)
      }
    })
  }

  createAddLinkTransaction(link: LinkSpecification, draft: TransactionDraft): Promise<AddLinkTransaction> {
    return Promise.reject(new Error('Error'))
  }

  executeSignedTransaction(transaction: SignedTransaction): Promise<TransactionReceipt> {
    return Promise.reject(new Error('Error'))
  }

  deleteAll(): Promise<string> {
    return Link.remove({}, (err: string, success: string) => {
      if (err) {
        return Promise.reject(new Error('Could not delete'))
      } else {
        return Promise.resolve(success)
      }
    })
  }
}
