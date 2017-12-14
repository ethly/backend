// @flow

import type {
  $Response,
} from 'express'

export default class ResponseFactory {
  static responseWithError(res: $Response, message: string) {
    res.json({
      error: message,
    })
  }

  static responseWithData(res: $Response, data: any) {
    res.json({
      data: data,
    })
  }
}
