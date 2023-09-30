import React from 'react';
import TablePaginationDemo from '@/components/TablePaginationDemo';

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

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await fetchPokemons(page, limit);

  return (
    <Suspense fallback={<p>Loading...</p>} key={String(page)}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        {data?.results &&
          data.results.map((pokemon: ApiPokemon) => {
            return (
              <React.Fragment key={pokemon.name}>
                <Pokemon key={pokemon.name} {...pokemon} />
              </React.Fragment>
            );
          })}
        <TablePaginationDemo
          data={
            data || ({ count: 0, next: '', previous: '', results: [] } as Data)
          }
        />
      </main>
    </Suspense>
  );
};

export default Home;
