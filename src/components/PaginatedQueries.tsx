import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

const fetchColors = (pageNumber: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, isLoading, error, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) {
    return <h2>Is Loading</h2>
  }

  if (error) {
    return <h2>{(error as any).message}</h2>
  }

  return (
    <div>
      {data?.data.map((color: any) => {
        return <p key={color.id}>{color.label}</p>
      })}
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  )
}

export default PaginatedQueries
