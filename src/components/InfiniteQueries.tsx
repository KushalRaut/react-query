import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  if (isLoading) {
    return <h2>Is Loading</h2>
  }

  if (error) {
    return <h2>{(error as any).message}</h2>
  }

  return (
    <div>
      {data?.pages.map((group: any, i: number) => {
        return (
          <Fragment key={i}>
            {group.data.map((color: any, i: number) => {
              return (
                <h3 key={i}>
                  {color.id} {color.label}
                </h3>
              )
            })}
          </Fragment>
        )
      })}
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load More
        </button>
      </div>
      <div>{isFetching || (isFetchingNextPage && <p>Loading..</p>)}</div>
    </div>
  )
}

export default InfiniteQueries
