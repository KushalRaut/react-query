import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheros/${heroId}`)
}

export const useSuperHeroData = (heroId: string | undefined) => {
  return useQuery(['super-hero', heroId], fetchSuperHero, {})
}
