import profiles from '../api/strava_modules/profile';
import tokens from '../api/strava_modules/token_manager';

export default function Profile({profile, activity}) {
  return (
    <>
      <div className='px-6 pb-12'>
        <h1>Dashboard</h1>
        <div className='container mx-auto'>
          <table className='table-fixed border border-collapse border-current bg-orange-200'>
            <caption className="caption-top">
              Profile
            </caption>
            <thead>
              <tr className='bg-orange-300'>
                <td className='border border-current p-2 text-xs'>Key</td>
                <td className='border border-current p-2 text-xs'>Value</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(profile).map((key) => {
                  return (
                    <tr key={key}>
                      <td className='border border-current p-2'>{key}</td>
                      <td className='border border-current p-2'>{profile[key]}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className='container mx-auto'>
          
          <table className='table-fixed border border-collapse border-current bg-orange-200'>
            <caption className="caption-top">
              Last activity
            </caption>
            <thead>
              <tr className='bg-orange-300'>
                <td className='border border-current p-2 text-xs'>Key</td>
                <td className='border border-current p-2 text-xs'>Value</td>
              </tr>
            </thead>
            <tbody>
              {
                console.log(activity)

                // Object.keys(activity).map((key) => {
                //   return (
                //     <tr key={key}>
                //       <td className='border border-current p-2'>{key}</td>
                //       <td className='border border-current p-2'>{profile[key]}</td>
                //     </tr>
                //   )
                // })
              }
            </tbody>
          </table>
        </div>
      </div>



    </>
  )
}

export async function getServerSideProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const uid = Number(params.uid)

  const profile = await profiles.get(uid)
    .then(data => JSON.parse(JSON.stringify(data)))   //Return value must be a json
    .catch((error) => {
      throw new Error('Dashboard/[uids]: get profile data > '+ error)
    })

  const token = await tokens.get(uid)
    .catch((error) => {
      throw new Error('Dashboard/[uids]: get token > '+ error)
    })
  const headers = { 'Authorization': `Bearer ${token.access_token}` }
  const activity = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=1", {headers})
    .then((data) => {
      console.log('fetch')
      console.dir(data);
      if(data.length)
        return data.json()[0]
      else return null
    })
    .catch((error) => {
      throw new Error('Dashboard/[uids]: fetch activities > '+ error)
    })
  return {
    props: {
      profile,
      activity
    }
  }
}
