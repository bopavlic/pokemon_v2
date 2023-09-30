import TablePaginationDemo from '@/components/TablePaginationDemo';
import Loading from './loading';
import { Suspense } from 'react';

const Home: any = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  interface Data {
    count: number;
    next: string;
    previous: string;
    results: Array<Pokemon>;
  }

  interface Pokemon {
    name: string;
    url: string;
  }

  const page: number = +searchParams.page! || 0;
  const limit: number = +searchParams.limit! || 10;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${page}`,
    { cache: 'no-cache' }
  );

  const data: Data = await response.json();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Suspense fallback={<Loading />} key={page}>
        {data.results.map((pokemon: Pokemon) => {
          return (
            <div
              key={pokemon.name}
              className='flex flex-col items-center justify-center'
            >
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </Suspense>
      <TablePaginationDemo data={data} />
    </main>
  );
};

export default Home;
