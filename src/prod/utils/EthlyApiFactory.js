// @flow

import EthlyApi, {
  eth,
} from 'ethly-api'

const {
  EthereumAddress,
  HttpEthereumClient,
} = eth

/**
 * Gas from console.
 * @param account address of account to deploy contract to
 * @param httpAddress address to open connection on
 * @returns {Promise<EthlyApi>} created api
 */
function deployContract(account: EthereumAddress, httpAddress: string): Promise<EthlyApi> {
  return Promise.resolve(new HttpEthereumClient(httpAddress))
    .then(client => {
      return EthlyApi.deployContract(client, {
        from: account,
        gas: 2100000,
      })
    })
}

/**
 * Create api for deployed contract.
 * @param account address of contract
 * @param httpAddress address to open connection on
 * @returns {Promise<EthlyApi>} created api
 */
function createApiForAddress(account: EthereumAddress, httpAddress: string): Promise<EthlyApi> {
  return Promise.resolve(new HttpEthereumClient(httpAddress))
    .then(client => {
      return EthlyApi.forContract(client, account)
    })
}

export {
  deployContract,
  createApiForAddress,
}

