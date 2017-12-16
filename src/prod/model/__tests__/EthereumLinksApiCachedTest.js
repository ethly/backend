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
  createTestLinkSpec,
  createTestTransactionReceipt,
  createTestTransactionDraft,
  createTestAddLinkTransaction,
} from 'staging/TestFactory'
import {
  LinksApi,
} from 'prod/model/LinksApi'
import EthereumLinksApiCached from 'prod/model/EthereumLinksApiCached'

describe('EthereumLinksApiCache', () => {
  // let linksApi: LinksApi
  // let cachedApi: EthereumLinksApiCached
  //
  // beforeEach(() => {
  //   linksApi = {
  //     addLink: jasmine.createSpy('addLink'),
  //     createAddLinkTransaction: jasmine.createSpy('createAddLinkTransaction'),
  //     executeSignedTransaction: jasmine.createSpy('executeSignedTransaction'),
  //     getLinksCount: jasmine.createSpy('getLinksCount'),
  //     listAllLinks: jasmine.createSpy('listAllLinks'),
  //   }
  //
  //   cachedApi = new EthereumLinksApiCached(linksApi)
  // })
  //
  // describe('getLinksCount', () => {
  //   it('should invoke api', () => {
  //     cachedApi.getLinksCount()
  //     expect(linksApi.getLinksCount).toHaveBeenCalled()
  //   })
  //
  //   it('should propagate api', (done) => {
  //     linksApi.getLinksCount.and
  //       .returnValue(Promise.resolve(10))
  //
  //     linksApi.getLinksCount()
  //       .then(count => {
  //         expect(count).toEqual(10)
  //         done()
  //       })
  //   })
  // })
  //
  // describe('listAllLinks', () => {
  //   it('should invoke api', () => {
  //     linksApi.listAllLinks.and
  //       .returnValue(Promise.resolve([createTestLinkSpec('label', 'url')]))
  //     linksApi.getLinksCount.and
  //       .returnValue(Promise.resolve(1))
  //
  //     cachedApi.listAllLinks()
  //       .then(links => {
  //         expect(linksApi.listAllLinks).toHaveBeenCalled()
  //         done()
  //       })
  //   })
  //
  //   it('should propagate api first time', (done) => {
  //     const link = createTestLinkSpec('label', 'url')
  //     linksApi.listAllLinks.and
  //       .returnValue(Promise.resolve([link]))
  //     linksApi.getLinksCount.and
  //       .returnValue(Promise.resolve(1))
  //
  //     cachedApi.listAllLinks()
  //       .then(links => {
  //         expect(links.length).toBe(1)
  //         expect(links[0]).toEqual(link)
  //         done()
  //       })
  //   })
  //
  //   it('should not call api second time', (done) => {
  //     const link = createTestLinkSpec('label', 'url')
  //     linksApi.listAllLinks.and
  //       .returnValue(Promise.resolve([link]))
  //     linksApi.getLinksCount.and
  //       .returnValue(Promise.resolve(1))
  //
  //     cachedApi.listAllLinks()
  //       .then(links => {
  //         // console.log(linksApi.listAllLinks.calls.all())
  //         expect(linksApi.listAllLinks).toHaveBeenCalled()
  //         return cachedApi.listAllLinks()
  //       })
  //       .then(links => {
  //         // console.log(linksApi.listAllLinks.calls.all())
  //         expect(linksApi.listAllLinks.calls.all().length).toBe(1)
  //         done()
  //       })
  //   })
  // })
  //
  // describe('addLink', () => {
  //   it('should invoke api', () => {
  //     cachedApi.addLink()
  //     expect(linksApi.addLink).toHaveBeenCalled()
  //   })
  //
  //   it('should propagate api', (done) => {
  //     linksApi.addLink.and
  //       .returnValue(Promise.resolve(createTestTransactionReceipt()))
  //
  //     cachedApi.addLink(createTestLinkSpec('label', 'url'))
  //       .then(receipt => {
  //         expect(receipt).toEqual(createTestTransactionReceipt())
  //         done()
  //       })
  //   })
  // })
  //
  // describe('createAddLinkTransaction', () => {
  //   it('should invoke api', () => {
  //     const spec = createTestLinkSpec('label', 'url')
  //     const draft = createTestTransactionDraft()
  //
  //     cachedApi.createAddLinkTransaction(spec, draft)
  //     expect(linksApi.createAddLinkTransaction).toHaveBeenCalledWith(spec, draft)
  //   })
  //
  //   it('should propagate api', (done) => {
  //     linksApi.createAddLinkTransaction.and
  //       .returnValue(Promise.resolve(createTestAddLinkTransaction()))
  //
  //     cachedApi.createAddLinkTransaction(createTestLinkSpec('label', 'url'), createTestTransactionDraft())
  //       .then(transaction => {
  //         expect(transaction).toEqual(createTestAddLinkTransaction())
  //         done()
  //       })
  //   })
  // })
  //
  // describe('executeSignedTransaction', () => {
  //   it('should invoke api', () => {
  //     cachedApi.executeSignedTransaction('1234')
  //     expect(linksApi.executeSignedTransaction).toHaveBeenCalledWith('1234')
  //   })
  //
  //   it('should propagate api', (done) => {
  //     linksApi.executeSignedTransaction.and
  //       .returnValue(Promise.resolve(createTestTransactionReceipt()))
  //
  //     cachedApi.executeSignedTransaction('1234')
  //       .then(receipt => {
  //         expect(receipt).toEqual(createTestTransactionReceipt())
  //         done()
  //       })
  //   })
  // })
})
