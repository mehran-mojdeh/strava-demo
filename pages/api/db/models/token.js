import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  uid: Number,
  refresh_token: String,
  access_token: String,
  expires_at: Number
})

module.exports = mongoose.model('Token', TokenSchema)