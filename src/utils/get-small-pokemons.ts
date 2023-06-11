import type { PokemonList, SmallPokemon } from '~/types/pokemon'

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  )
  const data: PokemonList = await res.json()

  const smallPokemons = data.results.map((pokemon) => {
    const segments = pokemon.url.split('/')
    const id = segments[segments.length - 2]
    return { id, name: pokemon.name }
  })

  return smallPokemons satisfies SmallPokemon[]
}
