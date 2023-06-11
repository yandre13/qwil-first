import { $, component$ } from '@builder.io/qwik'
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonContext } from '~/context/pokemon'

export default component$(() => {
  // const pokemonId = useSignal(1) // for primitive values
  // // const pokemon = useStore() // for objects and arrays
  // const showBack = useSignal(false)
  // const reveal = useSignal(false)

  const pokemon = usePokemonContext() // read context

  const nav = useNavigate()

  const changePokemonId = $((newId: number) => {
    if (pokemon.pokemonId + newId <= 0) return
    pokemon.pokemonId += newId
  })

  const toggleBack = $(() => {
    pokemon.showBack = !pokemon.showBack
  })

  const toggleReveal = $(() => {
    pokemon.reveal = !pokemon.reveal
  })

  return (
    <>
      <span class="text-2xl">Simple search</span>

      <span class="text-9xl">{pokemon.pokemonId}</span>

      {/* <Link href={`/pokemons/${pokemonId.value}/`}> */}
      <div
        onClick$={async () => {
          await nav(`/pokemons/${pokemon.pokemonId}/`)
        }}
        class="cursor-pointer"
      >
        <PokemonImage
          pokemonId={pokemon.pokemonId}
          backImage={pokemon.showBack}
          visible={pokemon.reveal}
        />
      </div>
      {/* </Link> */}

      <div class="flex gap-4">
        <button class="btn btn-primary" onClick$={() => changePokemonId(-1)}>
          Prev
        </button>
        <button class="btn btn-primary" onClick$={() => changePokemonId(+1)}>
          Next
        </button>
        <button class="btn btn-primary" onClick$={toggleBack}>
          Flip
        </button>
        <button class="btn btn-primary" onClick$={toggleReveal}>
          Reveal
        </button>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
