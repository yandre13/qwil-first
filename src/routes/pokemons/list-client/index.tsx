import { $, component$, useOnDocument, useTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonListContext } from '~/context/pokemon-list'

import { getSmallPokemons } from '~/utils/get-small-pokemons'

export default component$(() => {
  const pokemonState = usePokemonListContext()

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage)
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30)
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    pokemonState.loading = false
  }) // Runs on server and client

  // useVisibleTask$(() => {
  //   console.log('useVisibleTask$')
  // }) // Runs only on client

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight
      console.log('scroll', currentScroll, maxScroll)
      if (currentScroll + 200 >= maxScroll && !pokemonState.loading) {
        pokemonState.loading = true
        pokemonState.currentPage++
      }
    })
  )

  return (
    <>
      <div class="flex flex-col">
        <span class="text-5xl">Status</span>
        <span>Current page: {pokemonState.currentPage}</span>
        {/* <span>{loc.isNavigating ? 'Loading...' : 'Loaded!'} </span> */}
      </div>

      <div class="mt-4 flex gap-4">
        <button
          class="btn btn-primary"
          onClick$={() => pokemonState.currentPage--}
        >
          Prev
        </button>
        <button
          class="btn btn-primary"
          onClick$={() => pokemonState.currentPage++}
        >
          Next
        </button>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5 xl:grid-cols-7">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            class="flex flex-col items-center justify-center"
            key={pokemon.id}
          >
            <span class="text-2xl">{pokemon.name}</span>
            <PokemonImage pokemonId={pokemon.id} visible />
          </div>
        ))}
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Client List',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description for Client List',
    },
  ],
}
