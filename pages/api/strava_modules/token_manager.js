// const token  = "a47f4a039771da2b161e39abd7ba72a2d8a43d87";
// export default token
const ClientID = 103334
const ClientSecret = "a47f4a039771da2b161e39abd7ba72a2d8a43d87"
const AccessToken = "804792afa64298cb9b544d94d31ff4df5e8e0ff3"
const RefreshToken = "f1b2d3ff0181183ec96b92986e8bd6d6f37fca75"


require('../db/dbConnect');
import Token from '../db/models/token'

const get = async (uid) => {
  // No argument means master API key
  if (!uid) return {
    ClientID,
    ClientSecret,
    AccessToken,
    RefreshToken
  };
      
  //user's credentials
  let token = await Token.findOne({uid})
    .catch((error) => {
      throw new Error('Token Model: get: '+ error)
    })
    
  // check if token has been expired
  if( token && token.expires_at*1000 < Date.now() )
    token = await renewToken(token)
  
  return token
}
const set = async (params) => {
  const {uid, refresh_token, access_token, expires_at} = params
  if( !uid || !refresh_token || !access_token || !expires_at)
    throw new Error('Token Manager: Set: Wrong Input', params)
  
  // duplicate prevention
  let token;
  const prev_token = await get(uid)

  if( prev_token ) {
    token = await Token.updateOne({uid}, {refresh_token, access_token, expires_at})
      .catch((error) => {
        throw new Error('Token Model: set: update > '+ error)
      })
  } else {
    token = await Token.create({uid, refresh_token, access_token, expires_at})
      .catch((error) => {
        throw new Error('Token Model: set: create > '+ error)
      })
  }
  return token
}
const renewToken = async (prevToken) => {
  let {uid} = prevToken

  const uri = `https://www.strava.com/api/v3/oauth/token?client_id=${ClientID}&client_secret=${ClientSecret}&grant_type=refresh_token&refresh_token=${prevToken.refresh_token}`

  const res = await fetch(uri, {method: "post"})
    .catch((error) => {
      throw new Error('Token Manager: renewToken: fetch > '+ error)
    })
    
  const {refresh_token, access_token, expires_at} = await res.json()
  const token = {refresh_token, access_token, expires_at}
  
  await Token.updateOne({uid}, token)
    .catch((error) => {
      throw new Error('Token Model: renewToken: update > '+ error)
    })
  return token
}

const token_manager = {get, set}
export default token_manager;
