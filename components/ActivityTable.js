export default function ActivityTable ({activity}) {
  return (
    <div className='container mx-auto pt-6'>
      <table className='table-auto w-full border border-collapse border-current bg-orange-200'>
        <caption className="caption-top">
          Activity {activity.id}
        </caption>
        <thead>
          <tr className='bg-orange-300'>
            <td className='border border-current p-2 text-xs'>Key</td>
            <td className='border border-current p-2 text-xs'>Value</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(activity).map((key) => {
              return (
                <tr key={key}>
                  <td className='border border-current p-2'>{key}</td>
                  <td className='border border-current p-2'>{JSON.stringify(activity[key]).slice(0,70)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}