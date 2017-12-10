// @flow

import Config from 'config-js'

const configFile = new Config('./config.js')

const etherAddresses = {
  account: configFile.get('addresses.account'),
  contract: configFile.get('addresses.contract'),
}

export const addresses = etherAddresses
