// @flow

import EthlyApi, {
  eth,
} from 'ethly-api'

const {
  EthereumAddress,
  HttpEthereumClient,
} = eth

/**
 * Deploys new contract.
 * @param account address of account to deploy contract to
 * @param httpAddress address to open connection on
 * @returns {Promise<EthlyApi>} created api
 */
function deployContract(account: EthereumAddress, httpAddress: string): Promise<EthlyApi> {
  return EthlyApi.deployContract(new HttpEthereumClient(httpAddress), {
    from: account,
    gas: 2100000,
  })
}

/**
 * Create api for deployed contract.
 * @param account address of contract
 * @param httpAddress address to open connection on
 * @returns {Promise<EthlyApi>} created api
 */
function createApiForAddress(account: EthereumAddress, httpAddress: string): Promise<EthlyApi> {
  return EthlyApi.forContract(new HttpEthereumClient(httpAddress), account)
}

export {
  deployContract,
  createApiForAddress,
}

