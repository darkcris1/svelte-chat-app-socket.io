<script>
  export let danger = false
  export let ref = null
</script>

<button
  on:click
  bind:this={ref}
  {...$$restProps}
  class:bg-blue-500={!danger}
  class:bg-red-500={danger}
  class={`p-2 my-2 disabled:opacity-50 disabled:cursor-default text-white rounded-md focus:outline-none
  focus:ring-2 ring-blue-300 ring-offset-2 ${$$restProps.class} flex items-center justify-center shadow-xl`}>
  <slot />
  <slot name="icon" />
</button>
