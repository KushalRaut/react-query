import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheros/${heroId}`)
}

interface Props {
  heroIds: number[]
}

const DynamicQueries = ({ heroIds }: Props) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    })
  )

  console.log(queryResults)

  return <div>DynamicQueries</div>
}

export default DynamicQueries
