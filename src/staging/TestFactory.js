// @flow

import {
  eth,
} from 'ethly-api'

const {
  TransactionDraft,
  TransactionReceipt,
  AddLinkTransaction,
} = eth

import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

export function createTestLinkSpec(label: string, url: string): LinkSpecification {
  return new LinkSpecification(
    '0',
    label,
    url,
    '',
    ['test',],
    0
  )
}

export function createTestLinkSpecWithId(id: string, label: string, url: string): LinkSpecification {
  return new LinkSpecification(
    id,
    label,
    url,
    '',
    ['test',],
    0
  )
}

export function createTestTransactionDraft(): TransactionDraft {
  return {
    from: 'from',
    value: 10,
    gas: 10,
    gasPrice: 10,
    nonce: 10,
  }
}

export function createTestTransactionReceipt(): TransactionReceipt {
  return {
    transactionHash: 'hash',
    from: 'from',
    to: 'to',
    gasUsed: 20000,
  }
}

export function createTestAddLinkTransaction(): AddLinkTransaction {
  return {
    from: 'from',
    to: 'to',
    value: 10,
    gas: 10,
    gasPrice: 10,
    nonce: 10,
  }
}