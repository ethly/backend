// @flow

import mongoose from 'mongoose'

import DbLinksApi from 'staging/DbLinksApi'
import {
  createTestLinkSpec,
} from 'staging/TestFactory'

describe('DbLinksApi', () => {
  let api: DbLinksApi

  beforeEach((done) => {
    mongoose.connect('mongodb://localhost/testdb')
    api = new DbLinksApi()

    api.deleteAll()
      .then(success => {
        done()
      })
  })

  describe('getLinksCount', () => {
    it('should return 0 if db is empty', () => {
      return api.getLinksCount()
        .then(count => {
          expect(count).toBe(0)
        })
    })
  })

  describe('addLink', () => {
    it('should add', (done) => {
      return api.addLink(createTestLinkSpec('label', 'url'))
        .then(link => {
          expect(link.url).toBe('url')
          expect(link.label).toBe('label')

          return api.listAllLinks()
        })
        .then(links => {
          expect(links.length).toBe(1)
          expect(links[0].url).toBe('url')
          expect(links[0].label).toBe('label')
          done()
        })
    })
  })

  describe('createAddLinkTransaction', () => {
    it('should fail', (done) => {
      api.createAddLinkTransaction(
        createTestLinkSpec('label', 'url'),
        { account: 'account', }
      )
        .then(() => {
          done.fail(new Error('Promise should not be resolved'))
        }, (reason) => {
          done()
        })
    })
  })

  describe('executeSignedTransaction', () => {
    it('should fail', (done) => {
      api.executeSignedTransaction().then(() => {
        done.fail(new Error('Promise should not be resolved'))
      }, (reason) => {
        done()
      })
    })
  })
})
