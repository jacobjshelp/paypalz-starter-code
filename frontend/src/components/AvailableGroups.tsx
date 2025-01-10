import { getGroupsForMember } from '../functions/getGroupsForMember'
import { Group } from '@jacobjshelp/paypalztypes'
import { useQuery } from '@tanstack/react-query'
import GroupListItem from './GroupListItem'

function AvailableGroups() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: () => {
      return getGroupsForMember('user-Jayden')
    },
  })

  if (isError) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Your groups</h1>
      {data.map((g: Group) => {
        return (
          <GroupListItem
            key={g.id}
            name={g.name}
            onClick={() => {
              console.log(`Clicked on group ${g.name}`)
            }}
          />
        )
      })}
    </>
  )
}

export default AvailableGroups
