import { component$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/utils/get-small-pokemons'

export const usePokemonList = routeLoader$(async (req) => {
  const offset = req.query.get('offset') || '0'

  if (isNaN(Number(offset)) || Number(offset) < 0 || Number(offset) > 1000) {
    req.redirect(301, req.pathname)
  }

  const pokemons = await getSmallPokemons(Number(offset))

  return pokemons
})

export default component$(() => {
  const pokemonList = usePokemonList()
  const loc = useLocation()

  const offset = loc.url.searchParams.get('offset') || '0'

  return (
    <>
      <div class="flex flex-col">
        <span class="text-5xl">Status</span>
        <span>Offset: {offset}</span>
        <span>{loc.isNavigating ? 'Loading...' : 'Loaded!'} </span>
      </div>

      <div class="mt-4 flex gap-4">
        <Link
          href={`/pokemons/list-ssr/?offset=${Number(offset) - 10}`}
          class="btn btn-primary"
        >
          Prev
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${Number(offset) + 10}`}
          class="btn btn-primary"
        >
          Next
        </Link>
      </div>

      <div class="mt-6 grid grid-cols-6 gap-4">
        {pokemonList.value.map((pokemon) => (
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
  title: 'SSR List',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description for SSR List',
    },
  ],
}
