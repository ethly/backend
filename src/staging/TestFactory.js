// @flow

import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export function createTestLinkSpec(label: string, url: string): LinkSpecification {
  return new LinkSpecification(
    '0',
    label,
    url,
    '',
    [ 'test', ],
    0
  )
}
