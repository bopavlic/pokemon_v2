import React from 'react';

interface PokemonProps {
  name: string;
  url: string;
}

const Pokemon = (props: PokemonProps) => {
  const { name } = props;
  return (
    <div key={name} className='flex flex-col items-center justify-center'>
      <p>{name}</p>
    </div>
  );
};

export default Pokemon;
