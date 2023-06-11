import { component$ } from '@builder.io/qwik'
import { useCounter } from '~/hooks/use-counter'

export default component$(() => {
  const { counter, increase, decrease } = useCounter()

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-7xl">{counter.value}</span>

      <div class="mt-2">
        <button class="btn btn-primary" onClick$={decrease}>
          -1
        </button>
        <button class="btn btn-primary" onClick$={decrease}>
          -1
        </button>
        <button class="btn btn-primary" onClick$={increase}>
          +1
        </button>
      </div>
    </>
  )
})
