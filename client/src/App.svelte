<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import Login from './components/Login.svelte'
  import ChatRoom from './components/ChatRoom.svelte'
  import { joinRoom, loggedUser, users } from './store'

  $: console.log($users)

  let usernameValue = '',
    roomValue = ''

  function handleLogin() {
    if (!usernameValue || !roomValue) return
    joinRoom(usernameValue, roomValue)
  }
</script>

<Tailwindcss />
<main class="bg-gray-300 h-screen flex items-center justify-center w-full">
  {#if $loggedUser}
    <ChatRoom />
  {:else}
    <Login bind:usernameValue bind:roomValue {handleLogin} />
  {/if}

</main>
