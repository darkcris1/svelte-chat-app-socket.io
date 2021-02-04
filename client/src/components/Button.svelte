<script>
  import { createEventDispatcher } from 'svelte'

  const dispathcer = createEventDispatcher()
  export let variant = 'primary'

  function forward(e) {
    dispathcer('click', e)
  }
</script>

<button
  on:click={forward}
  {...$$restProps}
  class={`p-2 my-2 bg-blue-500 disabled:opacity-50 disabled:cursor-default text-white rounded-md focus:outline-none
  focus:ring-2 ring-blue-300 ring-offset-2 ${$$restProps.class} flex items-center justify-center shadow-xl`}>
  <slot />
  <slot name="icon" />
</button>
