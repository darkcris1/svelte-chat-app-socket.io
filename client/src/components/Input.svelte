<script>
  export let error = null
  export let label = ''

  export let value = ''
</script>

<div class={$$props.class}>
  <label
    for={label}
    class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
    {label}
  </label>
  <input
    id={label}
    bind:value
    name="password"
    {...$$restProps}
    class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
    border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200" />
  {#if error}
    <div class="p-2 bg-red-300 text-red-800 rounded border border-red-600">
      {error}
    </div>
  {/if}
</div>
