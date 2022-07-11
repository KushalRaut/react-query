import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheros')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

const ParallelQueries = () => {
  const { data: superHeroData } = useQuery('superheros', fetchSuperHeros)
  const { data: friendsData } = useQuery('friends', fetchFriends)

  return <div>ParallelQueries</div>
}

export default ParallelQueries
