<script>
  export let name, isSelf
</script>

<button
  class:bg-green-100={isSelf}
  class:hover:bg-gray-100={!isSelf}
  class="flex flex-row items-center rounded-xl p-2">
  <div
    class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
    {name.substr(0, 1)}
  </div>
  <div class="ml-2 text-sm font-semibold">{name}</div>
</button>
