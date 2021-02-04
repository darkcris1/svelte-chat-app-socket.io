<script>
  import { fade } from 'svelte/transition'

  export let name = '',
    message = ''

  export let isSelf = false
  const class1 = isSelf
    ? 'col-start-6 col-end-13 p-3'
    : 'col-start-1 col-end-8 p-3'
  const class2 = isSelf ? 'justify-start flex-row-reverse' : 'flex-row'
</script>

<div in:fade class={`rounded-lg ${class1}`}>
  <div class={`flex items-center ${class2}`}>
    <div
      class="flex items-center justify-center h-10 w-10 rounded-full
      bg-indigo-500 flex-shrink-0">
      {name.substr(0, 1).toUpperCase()}
    </div>
    <div
      class:bg-indigo-100={isSelf}
      class:bg-white={!isSelf}
      class="relative mr-3 text-sm py-2 px-4 shadow rounded-xl">
      <div>{message}</div>
    </div>
  </div>
</div>
