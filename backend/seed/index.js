if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const Promise = require('bluebird')
const { connString } = require('../src/config')
// Modify this json file as you like
const users = require('./users.json')


function resetDB() {
  mongoose.connect(connString)
  const connection = mongoose.connection
  connection.once('open', async () => {
    try {
      const collections = await connection.db.listCollections().toArray()
      await Promise.all(collections.map(collection => {
        return connection.db.dropCollection(collection.name)
      }))
      console.log('Successfully dropped all collections')

      const models = require('../src/models')
      console.log('Successfully created all collections')

      // The lines below this are just for testing purposes
      await Promise.all(users.map(user => models['User'].create(user)))
      console.log("Successfully inserted documents to 'users' collection")
    }
    catch(err) {
      console.log(err)
    }
    finally {
      mongoose.disconnect()
    }
  })
}

resetDB()