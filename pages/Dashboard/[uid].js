import profiles from '../api/strava_modules/profile';
import tokens from '../api/strava_modules/token_manager';

import ActivityTable from '../../components/ActivityTable';

export default function Profile({profile, activities}) {
  return (
    <>
      <div className='px-6 pb-12'>
        <h1>Dashboard</h1>
        <div className='container mx-auto'>
          <table className='table-auto w-full border border-collapse border-current bg-orange-200'>
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
        {
          activities.map((activity) => {
            return (
              <ActivityTable key={activity.id} activity={activity} />
            )
          })
        }
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
  const activities = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {headers})
    .then(async (data) => {
      // console.log('fetch')
      const actvts = await data.json()
      // console.dir(activities[0]);
      // return JSON.parse(JSON.stringify(activities[0]))
      return actvts
      // else return null
    })
    .catch((error) => {
      throw new Error('Dashboard/[uids]: fetch activities > '+ error)
    })
  return {
    props: {
      profile,
      activities
    }
  }
}
