import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
  uid:	Number,
  username:	String,
  firstname: String,
  lastname: String,
  bio: String,
  city: String,
  state: String,
  country: String,
  sex: String,
  badge_type_id: Number,
  weight: Number,
  profile_medium: String,
  profile: String,
  friend: {},
  follower: {},
  created_at: Date,
  updated_at: Date
})

module.exports = mongoose.model('Profile', ProfileSchema)