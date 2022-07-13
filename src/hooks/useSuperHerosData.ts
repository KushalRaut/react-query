import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheros')
}

const addSuperHero = (hero: { name: string; alterEgo: string }) => {
  return axios.post('http://localhost:4000/superheros', hero)
}

export const useSuperHerosData = (
  onSuccess: (data: any) => void,
  onError: (data: any) => void
) => {
  return useQuery('super-heros', fetchSuperHeros, {
    // enabled: false,
    onSuccess,
    onError,
    // cacheTime: 50000,
    // staleTime: 30000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: 'always',
    // refetchInterval: fetchInterval,
    // refetchIntervalInBackground: true,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero: any) => hero.name)
    //   return superHeroNames
    // },
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()

  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('super-heros')
      queryClient.setQueriesData('super-heros', (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        }
      })
    },
  })
}
