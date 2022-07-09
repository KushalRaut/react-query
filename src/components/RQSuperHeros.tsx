import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheros');
};

const RQSuperHeros = () => {
  const { data, isLoading, error, isFetching } = useQuery(
    'super-heros',
    fetchSuperHeros,
    {
      cacheTime: 5000,
    }
  );

  if (isLoading) {
    return <h2>Is Loading</h2>;
  }

  if (error) {
    return <h2>{(error as any).message}</h2>;
  }
  console.log({ isLoading, isFetching });

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      {data?.data.map((hero: any) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeros;
