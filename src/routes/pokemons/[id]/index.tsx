import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonContext } from '~/context/pokemon'

export const usePokemonId = routeLoader$((req) => {
  const id = Number(req.params.id) // get the id from the route params
  if (isNaN(id) || id < 1 || id > 1000) {
    req.redirect(301, '/')
  }
  return id // returns a signal with value of id
})

export default component$(() => {
  // const loc = useLocation()
  // const id = loc.params.id
  const id = usePokemonId()

  const { reveal, showBack } = usePokemonContext()

  return (
    <div>
      <h1 class="text-2xl">Pokemon Id: {id}</h1>
      <PokemonImage
        pokemonId={id.value}
        visible={reveal}
        backImage={showBack}
      />
    </div>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const pokemonId = resolveValue(usePokemonId)
  return {
    title: `Pokemon ${pokemonId}`,
    meta: [
      {
        name: 'description',
        content: 'Qwik site description for Pokemon: ' + pokemonId,
      },
    ],
  }
}
