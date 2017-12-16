// @flow

import LinksStorageProd from 'prod/model/LinksStorageProd'
import {
  createTestLinkSpecWithId,
} from 'staging/TestFactory'

describe('LinksStorageProd', () => {
  let storage: LinksStorageProd

  beforeEach(() => {
    storage = new LinksStorageProd()
  })

  it('store new links should extend', (done) => {
    const link1 = createTestLinkSpecWithId('id1', 'label1', 'url1')
    const link2 = createTestLinkSpecWithId('id2', 'label2', 'url2')
    const link3 = createTestLinkSpecWithId('id3', 'label3', 'url3')

    storage.storeNewLinks([link1, link2,])
      .then(() => storage.storeNewLinks([link1, link2, link3,]))
      .then(() => storage.getAllLinks())
      .then(links => {
        expect(links).toEqual([link1, link2, link3,])
        done()
      })
  })

  it('linksCount should return 0 on start', (done) => {
    storage.linksCount()
      .then(count => {
        expect(count).toBe(0)
        done()
      })
  })

  it('linksCount should return right count', (done) => {
    storage.storeNewLinks([
      createTestLinkSpecWithId('id1', 'label1', 'url1'),
      createTestLinkSpecWithId('id2', 'label2', 'url2'),
      createTestLinkSpecWithId('id3', 'label3', 'url3'),
    ])
      .then(() => {
        return storage.linksCount()
      })
      .then(count => {
        expect(count).toBe(3)
        done()
      })
  })

  it('getAllLinks should return empty list on start', (done) => {
    storage.getAllLinks()
      .then(links => {
        expect(links).toEqual([])
        done()
      })
  })

  it('getAllLinks should return right links', (done) => {
    const link1 = createTestLinkSpecWithId('id1', 'label1', 'url1')
    const link2 = createTestLinkSpecWithId('id2', 'label2', 'url2')
    const link3 = createTestLinkSpecWithId('id3', 'label3', 'url3')

    storage.storeNewLinks([link1, link2, link3,])
      .then(() => {
        return storage.getAllLinks()
      })
      .then(links => {
        expect(links).toEqual([link1, link2, link3,])
        done()
      })
  })

  it('getLink should return link', (done) => {
    const link1 = createTestLinkSpecWithId('id1', 'label1', 'url1')
    const link2 = createTestLinkSpecWithId('id2', 'label2', 'url2')
    const link3 = createTestLinkSpecWithId('id3', 'label3', 'url3')

    storage.storeNewLinks([link1, link2, link3,])
      .then(() => storage.getLink('id2'))
      .then(link => {
        expect(link).toEqual(link2)
        done()
      })
  })
})