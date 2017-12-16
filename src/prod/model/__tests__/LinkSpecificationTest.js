// @flow

import {
  LinkSpecification
} from 'prod/model/LinkSpecification'

describe('LinkSpecification', () => {
  it('toApiLink should convert', () => {
    const linkSpec = new LinkSpecification(
      'id',
      'label',
      'url',
      'description',
      [ 'hashtag', ],
      123
    )

    const apiLink = LinkSpecification.toApiLink(linkSpec)

    expect(apiLink.url).toEqual('url')
    expect(apiLink.label).toEqual('label')
    expect(apiLink.description).toEqual('description')
    expect(apiLink.hashtags).toEqual([ 'hashtag', ])
  })
})
