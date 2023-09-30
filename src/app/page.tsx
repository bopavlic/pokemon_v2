import { Suspense } from 'react';
import PokemonList from '@/components/PokemonList';
import TablePaginationDemo from '@/components/TablePaginationDemo';
import SkeletonList from '@/components/SkeletonList';
import { Data } from '@/types';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home: React.FC<HomeProps> = async (props) => {
  const { searchParams } = props;
  const page: number = +searchParams.page! || 0;
  const limit: number = +searchParams.limit! || 10;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${page}`
  );

  const data: Data = await response.json();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-16'>
      <Suspense
        fallback={<SkeletonList listLength={limit} />}
        key={page + limit}
      >
        <PokemonList data={data} />
      </Suspense>
      <TablePaginationDemo data={data} />
    </main>
  );
};

export default Home;
