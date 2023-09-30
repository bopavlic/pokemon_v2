import React from 'react';
import TablePaginationDemo from '@/components/TablePaginationDemo';
import Loading from './loading';
import { Suspense } from 'react';
import Pokemon from '@/components/Pokemon';
import { fetchPokemons } from '@/services/fetchPokemons';

const Home: any = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  interface ApiPokemon {
    name: string;
    url: string;
  }

  interface Data {
    count: number;
    next: string;
    previous: string;
    results: Array<ApiPokemon>;
  }

  const page: number = +searchParams.page! || 0;
  const limit: number = +searchParams.limit! || 10;

  const data = await fetchPokemons(page, limit);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Suspense fallback={<Loading />}>
        {data?.results &&
          data.results.map((pokemon: ApiPokemon) => {
            return (
              <React.Fragment key={pokemon.name}>
                <Pokemon key={pokemon.name} {...pokemon} />
              </React.Fragment>
            );
          })}
      </Suspense>
      <TablePaginationDemo
        data={
          data || ({ count: 0, next: '', previous: '', results: [] } as Data)
        }
      />
    </main>
  );
};

export default Home;
