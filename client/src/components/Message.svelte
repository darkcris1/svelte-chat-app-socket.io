<script>
  import { fade } from 'svelte/transition'

  export let name = '',
    message = ''

  export let isSelf = false
</script>

{#if isSelf}
  <div in:fade class="col-start-6 col-end-13 p-3 rounded-lg">
    <div class="flex items-center justify-start flex-row-reverse">
      <div
        class="flex items-center justify-center h-10 w-10 rounded-full
        bg-indigo-500 flex-shrink-0">
        {name.substr(0, 1)}
      </div>
      <div
        class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
        <div>{message}</div>
      </div>
    </div>
  </div>
{:else}

  <div in:fade class="col-start-1 col-end-8 p-3 rounded-lg">
    <div class="flex flex-row items-center">
      <div
        class="flex items-center justify-center h-10 w-10 rounded-full
        bg-indigo-500 flex-shrink-0">
        {name.substr(0, 1)}
      </div>
      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
        <div>{message}</div>
      </div>
    </div>
  </div>
{/if}
