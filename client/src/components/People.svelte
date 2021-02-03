<script>
  export let name
</script>

<button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
  <div
    class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
    {name.substr(0, 1)}
  </div>
  <div class="ml-2 text-sm font-semibold">{name}</div>
</button>
