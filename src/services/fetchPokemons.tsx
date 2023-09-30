interface Data {
  count: number;
  next: string;
  previous: string;
  results: Array<ApiPokemon>;
}

interface ApiPokemon {
  name: string;
  url: string;
}

export const fetchPokemons = async (page: number, limit: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${page}`
    );

    const data: Data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
