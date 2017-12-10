// @flow

import type {
  $Request,
  $Response,
} from 'express'

import EthereumLinksApi from 'prod/model/EthereumLinksApi'
import {
  LinksController,
} from 'controllers/LinksController'
import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export class LinksControllerProduction implements LinksController {
  api: EthereumLinksApi

  constructor() {
    EthereumLinksApi.createLinksApi()
      .then(api => {
        this.api = api
        console.log('Api created')
      })

    let unsafeThis = (this: any)
    unsafeThis.listAllLinks = this.listAllLinks.bind(this)
    unsafeThis.createLink = this.createLink.bind(this)
    unsafeThis.deleteLink = this.deleteLink.bind(this)
  }

  listAllLinks(req: $Request, res: $Response) {
    this.api.listAllLinks()
      .then(links => {
        res.json({
          links: links,
        })
      })
  }

  createLink(req: $Request, res: $Response) {
    this.api.addLink(
      new LinkSpecification(
        '0', // fake id for now, this is not stored in db so it's ok
        req.body.label,
        req.body.url,
        req.body.description,
        req.body.hashtags,
        0, // no timestamp before storing
      )
    )
      .then(receipt => res.send(receipt))
  }

  deleteLink(req: $Request, res: $Response) {
    res.json({
      message: 'Cannot delete link stored on Ethereum',
    })
  }
}
