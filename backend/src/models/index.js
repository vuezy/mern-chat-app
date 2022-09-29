const { Schema, model } = require('mongoose')
const models = {}

models['User'] = require('./User')(Schema, model)
models['Chat'] = require('./Chat')(Schema, model)
models['Message'] = require('./Message')(Schema, model)
models['UnreadMessage'] = require('./UnreadMessage')(Schema, model)

module.exports = models