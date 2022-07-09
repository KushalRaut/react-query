import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheros')
}

const RQSuperHeros = () => {
  const [fetchInterval, setFetchInterval] = useState<any>(3000)

  const onSuccess = (data: any) => {
    console.log('Sideeffect of successful response')
    if (data.data.length > 3) {
      setFetchInterval(false)
    }
  }
  const onError = (error: any) => {
    console.log('Sideeffect of failed response', error)
    setFetchInterval(false)
  }

  const { data, isLoading, error, isFetching, refetch } = useQuery(
    'super-heros',
    fetchSuperHeros,
    {
      // enabled: false,
      onSuccess,
      onError,
      // cacheTime: 50000,
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: 'always',
      refetchInterval: fetchInterval,
      // refetchIntervalInBackground: true,
    }
  )

  if (isLoading || isFetching) {
    return <h2>Is Loading</h2>
  }

  if (error) {
    return <h2>{(error as any).message}</h2>
  }
  console.log({ isLoading, isFetching })

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      {/* <button onClick={() => refetch()}>Fetch Data</button> */}
      {data?.data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}

export default RQSuperHeros
