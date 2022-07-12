import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

type heroDataType = () => {
  data: {
    id: number
    name: string
    alterEgo: string
  }
}

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheros/${heroId}`)
}

export const useSuperHeroData = (heroId: string | undefined) => {
  const queryClient = useQueryClient()

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero: any = (queryClient as any)
        .getQueryData('super-heros')
        ?.data?.find((hero: any) => hero.id === Number(heroId))

      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
  })
}
