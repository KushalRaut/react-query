import Homepage from './components/Homepage'
import RQSuperHeros from './components/RQSuperHeros'
import Superheros from './components/Superheros'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import RQSuperHeroPage from './components/RQSuperHeroPage'
import ParallelQueries from './components/ParallelQueries'
import DynamicQueries from './components/DynamicQueries'
import DependentQueries from './components/DependentQueries'
import PaginatedQueries from './components/PaginatedQueries'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heros">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heros">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/super-heros" element={<Superheros />} />
            <Route path="/rq-super-heros" element={<RQSuperHeros />} />
            <Route
              path="/rq-super-heros/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/rq-parallel-queries" element={<ParallelQueries />} />
            <Route
              path="/rq-dynamic-queries"
              element={<DynamicQueries heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent-queries"
              element={<DependentQueries email="kushalraut5@gmail.com" />}
            />
            <Route
              path="/rq-paginated-queries"
              element={<PaginatedQueries />}
            />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  )
}

export default App
