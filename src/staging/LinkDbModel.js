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
  description: {
    type: String,
  },
  hashtags: [
    {
      type: String,
      required: 'Please specify hashtags',
    },
  ],
  timestamp: {
    type: Number,
    required: 'Please specify timestamp',
  },
})

module.exports = mongoose.model('Links', LinkSchema)
