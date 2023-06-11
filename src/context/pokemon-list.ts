import { createContextId, useContext } from '@builder.io/qwik'
import type { SmallPokemon } from '~/types/pokemon'

export type PokemonListState = {
  currentPage: number
  loading: boolean
  pokemons: SmallPokemon[]
}

export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon.list-context'
)

export const usePokemonListContext = () => useContext(PokemonListContext) // read context with custom hook
