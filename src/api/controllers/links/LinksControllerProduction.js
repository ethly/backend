// @flow

import type {
  $Request,
  $Response,
} from 'express'

import {
  LinksController,
} from 'api/controllers/links/LinksController'

export class LinksControllerProduction implements LinksController {
  listAllLinks(req: $Request, res: $Response) {}

  createLink(req: $Request, res: $Response) {}

  readLink(req: $Request, res: $Response) {}

  deleteLink(req: $Request, res: $Response) {}
}
