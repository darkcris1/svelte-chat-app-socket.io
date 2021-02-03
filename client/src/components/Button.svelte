<script>
  import { createEventDispatcher } from 'svelte'

  const dispathcer = createEventDispatcher()
  export let variant = 'primary'
  const variants = {
    primary: 'blue',
    danger: 'red',
    success: 'green',
    secondary: 'gray',
    info: 'light-blue',
  }
  const color = variants[variant]

  function forward(e) {
    dispathcer('click', e)
  }
</script>

<button
  on:click={forward}
  {...$$restProps}
  class={`p-2 my-2 bg-${color}-500 disabled:opacity-50 disabled:cursor-default text-white rounded-md focus:outline-none
  focus:ring-2 ring-${color}-300 ring-offset-2 ${$$restProps.class}`}>
  <slot />
</button>
