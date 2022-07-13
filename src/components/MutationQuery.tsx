import { FunctionComponent, useState } from 'react'
import {
  useAddSuperHeroData,
  useSuperHerosData,
} from '../hooks/useSuperHerosData'
import { Link } from 'react-router-dom'

const MutationQuery: FunctionComponent = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data: any) => {
    console.log('Sideeffect of successful response')
  }
  const onError = (error: any) => {
    console.log('Sideeffect of failed response', error)
  }

  const { data, isLoading, error, isFetching, refetch } = useSuperHerosData(
    onSuccess,
    onError
  )

  const { mutate: addHero } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading || isFetching) {
    return <h2>Is Loading</h2>
  }

  if (error) {
    return <h2>{(error as any).message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => {
            setAlterEgo(e.target.value)
          }}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch Data</button>
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

export default MutationQuery
