<script>
  import Button from './Button.svelte'
  import Input from './Input.svelte'
  import Logo from './Logo.svelte'
  import { joinRoom } from '../store'

  let usernameValue, roomValue

  let isLoading = false

  async function handleLogin() {
    if (!usernameValue || !roomValue) return
    isLoading = true
    joinRoom(usernameValue, roomValue, () => {
      isLoading = false
    })
  }
</script>

<div class="grid place-items-center w-full">
  <div
    class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10
    sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">

    <Logo />
    <form on:submit|preventDefault={handleLogin}>
      <Input bind:value={usernameValue} label="Name" name="name" />
      <Input bind:value={roomValue} name="room" label="Room Name" />
      <Button disabled={isLoading} class="block w-full font-semibold">
        Enter or Create room
      </Button>
    </form>
  </div>
</div>
