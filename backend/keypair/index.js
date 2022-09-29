const { generateKeyPairSync } = require('crypto')
const fs = require('fs')

const keyPair = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
})

fs.writeFileSync(__dirname + '/rsa_pub_key.pem', keyPair.publicKey)
fs.writeFileSync(__dirname + '/rsa_priv_key.pem', keyPair.privateKey)