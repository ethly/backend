// @flow

import type {
  $Request,
  $Response,
} from 'express'

import {
  LinksController,
} from 'controllers/LinksController'
import ResponseFactory from 'prod/utils/ResponseFactory'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'
import Link from 'staging/LinkDbModel'

const date = new Date()

export class LinksControllerTesting implements LinksController {
  static createController(): Promise<LinksControllerTesting> {
    return Promise.resolve(new LinksControllerTesting())
  }

  listAllLinks(req: $Request, res: $Response) {
    Link.find({}, (err: string, task: string) => {
      if (err) {
        ResponseFactory.responseWithError(res, err)
      } else {
        ResponseFactory.responseWithData(res, task)
      }
    })
  }

  createLink(req: $Request, res: $Response) {
    let specs = LinkSpecification.fromBodyWithId('', req.body)
    specs.timestamp = date.getTime()

    const dbLink = new Link(specs)
    dbLink.save((err: string, task: string) => {
      if (err) {
        ResponseFactory.responseWithError(res, err)
      } else {
        ResponseFactory.responseWithData(res, task)
      }
    })
  }

  deleteLink(req: $Request, res: $Response) {
    Link.remove({
      _id: req.params.linkId,
    }, (err: string, task: string) => {
      if (err) {
        ResponseFactory.responseWithError(res, err)
      } else {
        ResponseFactory.responseWithData(res, task)
      }
    })
  }

  createAddLinkTransaction(req: $Request, res: $Response) {
    ResponseFactory.responseWithError(res, 'You should use add link in staging')
  }

  executeSignedTransaction(req: $Request, res: $Response) {
    ResponseFactory.responseWithError(res, 'Cannot execute signed transactions in staging')
  }
}
