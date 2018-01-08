module.exports = {
  accountConfig: {
    address: '0x4Eb84C3BCc0c1C4Cc9d90b415D9FE42532Fe9AdC',
  },
  apiConfig: {
    address: '0x66F4185b8CD92d0e3A95f8d73388a445e1d3249e', // You should override this after calling deploy
    host: 'http://localhost:8545',
    defaultGas: 210000,

  },
  dbConfig: {
    path: 'mongodb://localhost/LinksTempDB',
  }
}
