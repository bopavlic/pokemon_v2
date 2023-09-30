import { Data, Pokemon } from '@/types';

interface PokemonListProps {
  data: Data;
}

const PokemonList: React.FC<PokemonListProps> = async (props) => {
  const { data } = props;

  return (
    <div>
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
    </div>
  );
};

export default PokemonList;
