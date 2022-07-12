import { useQuery } from 'react-query'
import axios from 'axios'
interface Props {
  email: string
}

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueries = ({ email }: Props) => {
  const { data: userData } = useQuery(['userQuery', email], () =>
    fetchUserByEmail(email)
  )

  const channelId = userData?.data.channelId

  const { data: coursesData } = useQuery(
    ['channelData', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  )

  return (
    <div>
      Courses:
      {coursesData?.data.courses.map((course: any) => {
        return <p>{course}</p>
      })}
    </div>
  )
}

export default DependentQueries
