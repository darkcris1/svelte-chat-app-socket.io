<script>
  import { onMount } from 'svelte'
  import io from 'socket.io-client'
  import Tailwindcss from './Tailwindcss.svelte'
  import Login from './components/Login.svelte'
  import ChatRoom from './components/ChatRoom.svelte'
  import { ID_KEY } from './const'

  let username, room, data
  const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
  })

  function joinRoom(name, roomID) {
    socket.emit('join-room', { username: name, room: roomID }, (err) => {
      if (err) {
        alert("Room doesn't exist")
        data = ''
        return
      }
      data = { username: name, room: roomID }
      localStorage.setItem(ID_KEY, JSON.stringify(data))
    })
  }
  function handleLogin() {
    if (!username || !room) return
    joinRoom(username, room)
  }
  onMount(() => {
    const local = JSON.parse(localStorage.getItem(ID_KEY))
    if (!local) return
    joinRoom(local.username, local.room)
  })
</script>

<Tailwindcss />
<main class="bg-gray-300 h-screen flex items-center justify-center w-full">
  {#if data}
    <ChatRoom {...data} {socket} />
  {:else}
    <Login bind:username bind:room {handleLogin} />
  {/if}

</main>
