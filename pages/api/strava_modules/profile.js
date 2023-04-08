require('../db/dbConnect')

import Profile from '../db/models/profile'

const uids = async () => {
  const profile_uids = await Profile.find({},{uid:1})
    .catch((error) => {
      throw new Error('Profile Model: uids: query failed. '+ error)
    })
    return profile_uids
}

const get = async (uid) => {
  if(!uid)
    throw new Error('Profile Model: get: missing input uid.')
    
    const profile = await Profile.findOne({uid})
    .catch((error) => {
      throw new Error('Profile Model: get: query failed.'+ error)
    })
  
  return profile
}

const create = async (params) => {
  let data = {}
  for (const prop in params) {
    if(prop === 'id')
      data['uid'] = params[prop]
    else
      data[prop] = params[prop]
  }
  
  const profile = await Profile.create(data)
    .catch((error) => {
      throw new Error('Profile Model: create: query failed.'+ error)
    })
  return profile
}

const update = async (uid, params) => {
  console.log('uid',uid,'\n', params);
  if(!uid)
    throw new Error('Profile Model: update: missing input uid.')
  
  await Profile.updateOne({uid},params)
    .catch((error) => {
      throw new Error('Profile Model: update: query failed.'+ error)
    })

  const profile = await get(uid)
  return profile
}

const profile_methods = {uids, get, create, update}
export default profile_methods