// @flow

import type {
  $Request,
  $Response,
} from 'express'

import EthereumLinksApi from 'prod/model/EthereumLinksApi'
import {
  LinksController,
} from 'controllers/LinksController'
import ResponseFactory from 'prod/utils/ResponseFactory'

import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export class LinksControllerProduction implements LinksController {
  api: EthereumLinksApi

  constructor(api: EthereumLinksApi) {
    this.api = api

    let unsafeThis = (this: any)
    unsafeThis.listAllLinks = this.listAllLinks.bind(this)
    unsafeThis.createLink = this.createLink.bind(this)
    unsafeThis.createAddLinkTransaction = unsafeThis.createAddLinkTransaction.bind(this)
    unsafeThis.executeSignedTransaction = unsafeThis.executeSignedTransaction.bind(this)
  }

  static createController(): Promise<LinksControllerProduction> {
    return EthereumLinksApi.createLinksApi()
      .then(api => {
        console.log('Api created')
        return new LinksControllerProduction(api)
      })
  }

  listAllLinks(req: $Request, res: $Response) {
    this.api.listAllLinks()
      .then(links => {
        ResponseFactory.responseWithData(res, links)
      })
  }

  createLink(req: $Request, res: $Response) {
    this.api.addLink(LinkSpecification.fromBodyWithId('0', req.body))
      .then(receipt => {
        ResponseFactory.responseWithData(res, receipt)
      })
  }

  createAddLinkTransaction(req: $Request, res: $Response) {
    this.api.createAddLinkTransaction(
      LinkSpecification.fromBodyWithId('0', req.body.link),
      req.body.draft
    )
      .then(transaction => {
        ResponseFactory.responseWithData(transaction)
      })
  }

  executeSignedTransaction(req: $Request, res: $Response) {
    this.api.executeSignedTransaction(req.body.transaction)
      .then(receipt => {
        ResponseFactory.responseWithData(res, receipt)
      })
  }
}
