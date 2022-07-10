import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuperHerosData } from '../hooks/useSuperHerosData'

const RQSuperHeros = () => {
  const [fetchInterval, setFetchInterval] = useState<any>(3000)

  const onSuccess = (data: any) => {
    console.log('Sideeffect of successful response')
    if (data.length > 3) {
      setFetchInterval(false)
    }
  }
  const onError = (error: any) => {
    console.log('Sideeffect of failed response', error)
    setFetchInterval(false)
  }

  const { data, isLoading, error, isFetching, refetch } = useSuperHerosData(
    onSuccess,
    onError
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
      {data?.data?.map((hero: any) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heros/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}

export default RQSuperHeros
