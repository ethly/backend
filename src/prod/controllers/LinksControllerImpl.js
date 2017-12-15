// @flow

import type {
  $Request,
  $Response,
} from 'express'

import {
  LinksApi,
} from 'prod/model/LinksApi'
import {
  LinksController,
} from 'prod/controllers/LinksController'
import ResponseFactory from 'prod/utils/ResponseFactory'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export class LinksControllerImpl implements LinksController {
  api: LinksApi

  constructor(api: LinksApi) {
    this.api = api

    let unsafeThis = (this: any)
    unsafeThis.listAllLinks = this.listAllLinks.bind(this)
    unsafeThis.listLinksByHashtag = this.listLinksByHashtag.bind(this)
    unsafeThis.createLink = this.createLink.bind(this)
    unsafeThis.createAddLinkTransaction = unsafeThis.createAddLinkTransaction.bind(this)
    unsafeThis.executeSignedTransaction = unsafeThis.executeSignedTransaction.bind(this)
  }

  listAllLinks(req: $Request, res: $Response) {
    this.api.listAllLinks()
      .then(links => {
        ResponseFactory.responseWithData(res, links)
      })
      .catch(err => {
        ResponseFactory.responseWithError(res, err)
      })
  }

  listLinksByHashtag(req: $Request, res: $Response) {
    this.api.listAllLinks()
      .then(links => {
        const filtered = links.filter(link => {
          return link.hashtags.indexOf(req.params.hashtag) > -1
        })
        ResponseFactory.responseWithData(res, filtered)
      })
      .catch(err => {
        ResponseFactory.responseWithError(res, err)
      })
  }

  createLink(req: $Request, res: $Response) {
    this.api.addLink(LinkSpecification.fromBodyWithId('0', req.body))
      .then(receipt => {
        ResponseFactory.responseWithData(res, receipt)
      })
      .catch(err => {
        ResponseFactory.responseWithError(res, err)
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
      .catch(err => {
        ResponseFactory.responseWithError(res, err)
      })
  }

  executeSignedTransaction(req: $Request, res: $Response) {
    this.api.executeSignedTransaction(req.body.transaction)
      .then(receipt => {
        ResponseFactory.responseWithData(res, receipt)
      })
      .catch(err => {
        ResponseFactory.responseWithError(res, err)
      })
  }
}
