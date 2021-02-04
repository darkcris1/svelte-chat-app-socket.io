<style global>
  @tailwind base;
  @layer base {
    h1 {
      @apply text-2xl;
    }
    h2 {
      @apply text-xl;
    }
    h3 {
      @apply text-lg;
    }
  }

  @tailwind components;
  @tailwind utilities;
  /* @layer components {
    .btn {
      @apply p-2 my-2 disabled\:opacity-50 disabled\:cursor-default text-white rounded-md focus\:outline-none focus\:ring-2 ring-offset-2  flex items-center justify-center shadow-xl;
    }
    .btn-primary {
      @apply bg-blue-500 ring-blue-300;
    }
    .btn-danger {
      @apply bg-red-500 ring-red-300;
    }
    .btn-warning {
      @apply bg-yellow-500 ring-yellow-300;
    }
  } */
</style>
