<script>
  import { afterUpdate } from 'svelte'

  import { uuid } from '../utils'
  import Button from './Button.svelte'
  import Container from './Container.svelte'
  import Input from './Input.svelte'
  import Logo from './Logo.svelte'
  import Message from './Message.svelte'
  import People from './People.svelte'
  import { ID_KEY } from '../const'
  import Toggler from './Toggler.svelte'

  const uid = uuid('user')
  export let username, room, socket, message

  let messages = []
  let users = []
  let chatMessages
  let isOpen
  function handleMessage() {
    if (!message) return
    const dataMessage = { username, text: message, room, id: uid.create() }
    socket.emit('send-message', dataMessage)
    dataMessage.isSelf = true
    messages = [...messages, dataMessage]
    message = ''
  }
  function handleLeave() {
    localStorage.removeItem(ID_KEY)
    window.location.reload()
  }
  afterUpdate(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight
    chatMessages.focus()
  })
  socket.on('server-message', (data) => {
    messages = [...messages, data]
  })
  socket.on('users', (data) => {
    users = data
  })
</script>

<div
  class="flex md:flex-row flex-col h-full w-full overflow-x-hidden
  bg-transparent ">
  <Toggler on:click={() => (isOpen = !isOpen)} />
  <div
    class={`flex-col py-8 px-3 sm:w-full md:w-64 w-2/4 bg-white flex-shrink-0
    overflow-auto fixed md:static top-0 h-screen z-50 transform
    ${isOpen ? '' : '-translate-x-full'} duration-150 md:transform-none`}>
    <Logo />
    <div class="text-md mt-5">
      <span class="font-bold">Room:</span>
      {room}
    </div>
    <div class="flex flex-col mt-8">
      <div class="flex flex-row items-center justify-between text-xs">
        <span class="font-bold">Active Conversations</span>
      </div>
      <div class="flex flex-col space-y-1 -mx-2 h-50 mb-2 overflow-y-auto">
        {#each users as { username, id } (id)}
          <People name={username} />
        {/each}

      </div>
    </div>
    <Button class="w-full" on:click={handleLeave}>Leave Room</Button>
  </div>
  <Container class="flex flex-col flex-auto h-full p-6 bg-gray-200">
    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4">
      <div
        bind:this={chatMessages}
        class="flex flex-col h-full overflow-x-auto mb-4 smoo">
        <div class="flex flex-col h-full">
          <div class="grid grid-cols-12 gap-y-2">
            {#each messages as { text, username, id, isSelf } (id)}
              <Message name={username} message={text} {isSelf} />
            {/each}

          </div>
        </div>
      </div>

      <form
        on:submit|preventDefault={handleMessage}
        class="flex items-center justify-center">

        <Input
          bind:value={message}
          autocomplete="off"
          class="w-full shadow-md"
          name="message" />

        <Button class="flex items-center justify-center ml-2">
          <span>Send</span>
          <span class="ml-2">
            <svg
              class="w-4 h-4 transform rotate-90 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </span>
        </Button>

      </form>
    </div>
  </Container>
</div>
