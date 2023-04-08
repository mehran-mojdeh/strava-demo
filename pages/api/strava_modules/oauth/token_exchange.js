import token_manager from '../token_manager';
import profile from '../profile';

export default async function token_exchange( code, scope ) {
  if(!code)
    throw new Error('Token Exchange: Input > Missing Code.')
  if(scope!=='read,read_all')
    throw new Error('Token Exchange: Input > Incorrect Scope.')

  try {
    const token = await token_manager.get()
      .catch((error) => {
        throw new Error('Token Exchange: Token: get > ' + error)
      })
      
    const uri = `https://www.strava.com/oauth/token?client_id=${token.ClientID}&client_secret=${token.ClientSecret}&code=${code}&grant_type=authorization_code`
    
    const res = await fetch(uri,{method: "post"})
    if(!res.ok) throw new Error('Token Exchange: Strava API > ' + res.status)

    const credentials = await res.json()
      console.log(credentials);
    const { refresh_token, access_token, expires_at, athlete } = credentials
    const uid = athlete.id

    const db_token_result = await token_manager.set({uid, refresh_token, access_token, expires_at})
      .catch((error) => {
        throw new Error('Token Exchange: Token: set > ' + error)
      })
    
    if(db_token_result.matchedCount) {
      await profile.update(uid, athlete)
        .catch((error) => {
          throw new Error('Token Exchange: Profile: update > '+ error)
        })
    } else {
        await profile.create(athlete)
        .catch((error) => {
          throw new Error('Token Exchange: Profile: create > '+ error)
        })
    }
    return uid

  } catch (error) {
    throw new Error(error)
  }
}