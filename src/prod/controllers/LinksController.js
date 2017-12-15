// @flow

import type {
  $Request,
  $Response,
} from 'express'

export interface LinksController {
  listAllLinks(req: $Request, res: $Response): void;

  listLinksByHashtag(req: $Request, res: $Response): void;

  createLink(req: $Request, res: $Response): void;

  createAddLinkTransaction(req: $Request, res: $Response): void;

  executeSignedTransaction(req: $Request, res: $Response): void;
}
