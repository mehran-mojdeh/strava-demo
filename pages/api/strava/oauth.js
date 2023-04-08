import token_exchange from "../strava_modules/oauth/token_exchange"

export default async function handler({query: { code, scope }}, res) {
  const uid = await token_exchange(code, scope)
    .catch((error) => {
      console.error(error)
      res.status(500).json({message: 'Something went wrong.'})
      return;
    })
    console.log(uid);
  res.redirect(301,`/Dashboard/${uid}`)
}
