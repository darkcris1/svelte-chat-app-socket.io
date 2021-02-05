<script>
  import { afterUpdate } from 'svelte'
  import calert from 'calerts'
  import Button from './Button.svelte'
  import Container from './Container.svelte'
  import Input from './Input.svelte'
  import Logo from './Logo.svelte'
  import Message from './Message.svelte'
  import People from './People.svelte'
  import Toggler from './Toggler.svelte'
  import { ID_KEY } from '../const'
  import { uuid, toDataUrl } from '../utils'
  import { users, socket, loggedUser } from '../store'
  import FileInput from './FileInput.svelte'

  const { username, room } = $loggedUser
  const uid = uuid('user')

  let message = ''
  let messages = []
  let chatMessages
  let isOpen
  let fileValue

  async function handleMessage(e) {
    console.log(e)
    const file = fileValue.files[0] || null
    const maxAllowedSize = 1 * 1024 * 1024
    if (e.target.tagName === 'FORM' && !message) return
    if (file && file.size > maxAllowedSize) {
      calert('Error', 'Image must be 1mb size below', 'error')
      fileValue.value = ''
      return
    }
    const dataMessage = {
      username,
      text: message,
      image: file && (await toDataUrl(file)),
      room,
      id: uid.create(),
    }
    socket.emit('send-message', dataMessage)
    dataMessage.isSelf = true
    messages = [...messages, dataMessage]
    message = ''
    fileValue.value = ''
  }
  function handleLeave() {
    localStorage.removeItem(ID_KEY)
    users.set([])
    loggedUser.set(null)
    socket.emit('user-leave')
  }
  afterUpdate(() => {
    if (!chatMessages) return
    chatMessages.scrollTop = chatMessages.scrollHeight
    chatMessages.focus()
  })
  socket.on('server-message', (data) => {
    messages = [...messages, data]
  })
</script>

<div
  class="flex md:flex-row flex-col h-full w-full overflow-x-hidden
  bg-transparent ">

  <!-- Side Bar -->
  <Toggler on:click={() => (isOpen = !isOpen)} />
  <div
    class:-translate-x-full={!isOpen}
    class={`flex-col py-8 px-3 md:w-64 w-2/4 bg-white flex-shrink-0
    overflow-auto fixed md:static top-0 h-screen z-50 transform duration-150 md:transform-none`}>
    <Logo />
    <div class="text-md mt-5">
      <span class="font-bold">Room:</span>
      {room}
    </div>
    <div class="text-md mt-5">
      <span class="font-bold">Name:</span>
      {username}
    </div>
    <div class="flex flex-col mt-8">
      <div class="flex flex-row items-center justify-between text-xs">
        <span class="font-bold">Active Conversations</span>
      </div>
      <div class="flex flex-col space-y-1 -mx-2 h-50 mb-2 overflow-y-auto">
        {#each $users as { username, id, isSelf } (id)}
          <People name={username} {isSelf} />
        {/each}

      </div>
    </div>
    <Button class="w-full" on:click={handleLeave}>Leave Room</Button>
  </div>
  <!-- SideBarEnd -->

  <!-- ChatMessages -->
  <Container class="flex flex-col flex-auto h-full p-6 bg-gray-200">
    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4">
      <div
        bind:this={chatMessages}
        class="flex flex-col h-full overflow-x-auto mb-4 smoo">
        <div class="flex flex-col h-full">
          <div class="flex flex-col">
            {#each messages as { text, id, image, username, isSelf } (id)}
              <Message {username} message={text} {image} {isSelf} />
            {/each}

          </div>
        </div>
      </div>

      <form
        on:submit|preventDefault={handleMessage}
        class="flex items-center justify-center">
        <div class="w-full relative">
          <Input
            bind:value={message}
            autocomplete="off"
            autofocus={true}
            class="w-full shadow-md"
            name="message" />

          <FileInput
            onChange={handleMessage}
            class="absolute right-0 bottom-0"
            bind:input={fileValue}>

            <svg
              slot="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </FileInput>
        </div>

        <Button class=" ml-2">
          Send
          <svg
            slot="icon"
            class="w-4 h-4 transform rotate-90 ml-1"
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
        </Button>

      </form>
    </div>
  </Container>
  <!-- CHat Messages End -->
</div>
