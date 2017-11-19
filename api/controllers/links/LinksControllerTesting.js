// @flow

import type {
  $Request,
  $Response,
} from 'express'

import {
  LinksController,
} from 'api/controllers/links/LinksController'
import Link from 'api/models/linksModel'

export class LinksControllerTesting implements LinksController {
  listAllLinks(req: $Request, res: $Response) {
    Link.find({}, (err: string, task: string) => {
      if (err) {
        res.send(err)
      }
      res.json(task)
    })
  }

  createLink(req: $Request, res: $Response) {
    let newLink = new Link(req.body)
    newLink.save((err: string, task: string) => {
      if (err) {
        res.send(err)
      }
      res.json(task)
    })
  }

  readLink(req: $Request, res: $Response) {
    Link.findById(req.params.linkId, (err: string, task: string) => {
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
