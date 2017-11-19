// @flow
import type {$Request, $Response, } from 'express'

import Link from 'api/models/linksModel'

exports.listAllLinks = (req: $Request, res: $Response) => {
  Link.find({}, (err: string, task: string) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.createLink = (req: $Request, res: $Response) => {
  let newLink = new Link(req.body)
  newLink.save((err: string, task: string) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.readLink = (req: $Request, res: $Response) => {
  Link.findById(req.params.linkId, (err: string, task: string) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.deleteLink = (req: $Request, res: $Response) => {
  Link.remove({
    _id: req.params.linkId,
  },
  (err: string, task: string) => {
    if (err) { res.send(err) }
    res.json({ message: 'Link successfully deleted', })
  })
}
