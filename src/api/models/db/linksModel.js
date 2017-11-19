// @flow

import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
  label: {
    type: String,
    required: 'Please specify label',
  },
  url: {
    type: String,
    required: 'Please specify URL',
  },
})

module.exports = mongoose.model('Links', LinkSchema)
