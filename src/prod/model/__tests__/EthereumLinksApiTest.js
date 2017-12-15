// @flow

import EthlyApi, {
  eth,
  Link,
} from 'ethly-api'

const {
  TransactionDraft,
  TransactionReceipt,
  SignedTransaction,
  AddLinkTransaction,
} = eth

import {
  LinksApi,
} from 'prod/model/LinksApi'
import {
  createTestLinkSpec,
  createTestTransactionReceipt,
  createTestTransactionDraft,
  createTestAddLinkTransaction,
} from 'staging/TestFactory'
import EthereumLinksApi from 'prod/model/EthereumLinksApi'


describe('EthereumLinksApi', () => {
  let ethlyApi: EthlyApi
  let linksApi: EthereumLinksApi

  beforeEach(() => {
    ethlyApi = {
      addLink: jasmine.createSpy('addLink'),
      createAddLinkTransaction: jasmine.createSpy('createAddLinkTransaction'),
      executeSignedTransaction: jasmine.createSpy('executeSignedTransaction'),
      getLinksCount: jasmine.createSpy('getLinksCount'),
      getAllLinks: jasmine.createSpy('getAllLinks'),
    }

    linksApi = new EthereumLinksApi(ethlyApi)
  })

  describe('getLinksCount', () => {
    it('should invoke api', () => {
      linksApi.getLinksCount()
      expect(ethlyApi.getLinksCount).toHaveBeenCalled()
    })

    it('should propagate api', (done) => {
      ethlyApi.getLinksCount.and
        .returnValue(Promise.resolve(10))

      ethlyApi.getLinksCount()
        .then(count => {
          expect(count).toEqual(10)
          done()
        })
    })
  })

  describe('listAllLinks', () => {
    it('should invoke api', () => {
      ethlyApi.getAllLinks.and
        .returnValue(Promise.resolve([createTestLinkSpec('label', 'url')]))

      linksApi.listAllLinks()
      expect(ethlyApi.getAllLinks).toHaveBeenCalled()
    })

    it('should propagate api', (done) => {
      ethlyApi.getAllLinks.and
        .returnValue(Promise.resolve([createTestLinkSpec('label', 'url')]))

      linksApi.listAllLinks()
        .then(links => {
          expect(links.length).toBe(1)
          done()
        })
    })
  })

  describe('addLink', () => {
    it('should invoke api', () => {
      linksApi.addLink(createTestLinkSpec('label', 'url'))
      expect(ethlyApi.addLink).toHaveBeenCalled()
    })

    it('should propagate api', (done) => {
      ethlyApi.addLink.and
        .returnValue(Promise.resolve(createTestTransactionReceipt()))

      linksApi.addLink(createTestLinkSpec('label', 'url'))
        .then(receipt => {
          expect(receipt).toEqual(createTestTransactionReceipt())
          done()
        })
    })
  })

  describe('createAddLinkTransaction', () => {
    it('should invoke api', () => {
      const spec = createTestLinkSpec('label', 'url')
      const draft = createTestTransactionDraft()

      linksApi.createAddLinkTransaction(spec, draft)
      expect(ethlyApi.createAddLinkTransaction).toHaveBeenCalledWith(
        new Link(
          spec.url,
          spec.label,
          spec.description,
          spec.hashtags,
        ),
        draft)
    })

    it('should propagate api', (done) => {
      ethlyApi.createAddLinkTransaction.and
        .returnValue(Promise.resolve(createTestAddLinkTransaction()))

      linksApi.createAddLinkTransaction(createTestLinkSpec('label', 'url'), createTestTransactionDraft())
        .then(transaction => {
          expect(transaction).toEqual(createTestAddLinkTransaction())
          done()
        })
    })
  })

  describe('executeSignedTransaction', () => {
    it('should invoke api', () => {
      linksApi.executeSignedTransaction('1234')
      expect(ethlyApi.executeSignedTransaction).toHaveBeenCalledWith('1234')
    })

    it('should propagate api', (done) => {
      ethlyApi.executeSignedTransaction.and
        .returnValue(Promise.resolve(createTestTransactionReceipt()))

      linksApi.executeSignedTransaction('1234')
        .then(receipt => {
          expect(receipt).toEqual(createTestTransactionReceipt())
          done()
        })
    })
  })
})
