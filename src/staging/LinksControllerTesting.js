// @flow

import type {
  $Request,
  $Response,
} from 'express'

import {
  LinksController,
} from 'controllers/LinksController'
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
        res.send(err)
      }
      res.json(task)
    })
  }

  createLink(req: $Request, res: $Response) {
    let specs = LinkSpecification.fromBodyWithId('', req.body)
    specs.timestamp = date.getTime()

    console.log(specs)

    const dbLink = new Link(specs)
    console.log(dbLink)
    dbLink.save((err: string, task: string) => {
      if (err) {
        res.send(err)
      }
      res.json(task)
    })
  }

  deleteLink(req: $Request, res: $Response) {
    Link.remove({
      _id: req.params.linkId,
    }, (err: string, task: string) => {
      if (err) {
        res.send(err)
      }
      res.json({
        message: 'Link successfully deleted',
      })
    })
  }
}
