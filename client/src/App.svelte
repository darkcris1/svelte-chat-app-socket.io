<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import Login from './components/Login.svelte'
  import ChatRoom from './components/ChatRoom.svelte'
  import { loggedUser } from './store'
</script>

<Tailwindcss />
<main class="bg-gray-300 h-screen flex items-center justify-center w-full">
  {#if $loggedUser}
    <ChatRoom />
  {:else}
    <Login />
  {/if}

</main>
