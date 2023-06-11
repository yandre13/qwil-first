import { createContextId, useContext } from '@builder.io/qwik'

export type PokemonState = {
  pokemonId: number
  showBack: boolean
  reveal: boolean
}

export const PokemonContext = createContextId<PokemonState>('pokemon.context')

export const usePokemonContext = () => useContext(PokemonContext) // read context with custom hook
