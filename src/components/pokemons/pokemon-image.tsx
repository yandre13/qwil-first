import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik'

interface PokemonImageProps {
  pokemonId: number | string
  size?: number
  backImage?: boolean
  visible?: boolean
}

export const PokemonImage = component$(
  ({
    pokemonId,
    size = 200,
    backImage = false,
    visible,
  }: PokemonImageProps) => {
    const url = useComputed$(() =>
      backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    )

    const isLoaded = useSignal(false)

    useTask$(({ track }) => {
      track(() => pokemonId)
      isLoaded.value = false
    })

    return (
      <div
        class="flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {!isLoaded.value && <span>Loading...</span>}
        <img
          src={url.value}
          alt="pokemon"
          height={size}
          width={size}
          onLoad$={() => {
            isLoaded.value = true
          }}
          class={[
            {
              hidden: !isLoaded.value,
              'brightness-0': !visible,
            },
            'transition-all',
          ]}
        />
      </div>
    )
  }
)
