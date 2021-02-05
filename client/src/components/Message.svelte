<script>
  import { fade } from 'svelte/transition'
  import calert from 'calerts'
  export let username = '',
    message = '',
    image = ''
  async function handleModal() {
    const res = await calert({
      image: {
        src: image,
        alt: 'sent image by user',
      },
      confirmButton: 'Download',
      cancelButton: 'Cancel',
    })
    if (res.isConfirmed) {
      calert.utils.tag('a', { href: src, download: 'image.png' }).click()
    }
  }

  export let isSelf = false
  const class2 = isSelf ? 'justify-start flex-row-reverse' : 'flex-row'
</script>

<div in:fade class={`rounded-lg max-w-full mb-2`}>
  <div class={`flex items-center ${class2}`}>
    <div
      class="flex items-center justify-center h-10 w-10 rounded-full
      bg-indigo-500 flex-shrink-0">
      {username.substr(0, 1).toUpperCase()}
    </div>
    <div
      class:bg-indigo-100={isSelf}
      class:bg-white={!isSelf}
      style="word-break:break-word;"
      class="relative mr-3 text-sm py-2 px-4 shadow rounded-xl max-w-full">
      <div>{message}</div>
      {#if image}
        <img
          src={image}
          on:click={handleModal}
          class="max-w-full max-h-60 cursor-pointer"
          alt={`sent by ${username}`} />
      {/if}
    </div>
  </div>
</div>
