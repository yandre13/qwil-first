import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik'
import { PokemonContext, type PokemonState } from './pokemon'
import { PokemonListContext, type PokemonListState } from './pokemon-list'

export const PokemonProvider = component$(() => {
  const pokemonState = useStore<PokemonState>({
    pokemonId: 1,
    showBack: false,
    reveal: false,
  }) // initial value for context
  const pokemonListState = useStore<PokemonListState>({
    currentPage: 0,
    loading: false,
    pokemons: [],
  })

  useContextProvider(PokemonContext, pokemonState) // set context
  useContextProvider(PokemonListContext, pokemonListState) // set context

  return <Slot />
})
