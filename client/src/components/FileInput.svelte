<script>
  import { uuid } from '../utils'
  export let label = '',
    input = '',
    className,
    onChange
  export { className as class }

  const uid = uuid('LABEL')

  const uniqueLabel = label || uid.create()
</script>

<div class={className + ' cursor-pointer'}>
  <label
    class="flex items-center justify-center cursor-pointer"
    for={uniqueLabel}>
    <span class="inline-block">
      <slot />
    </span>
    <slot name="icon" />
  </label>
  <input
    {...$$restProps}
    bind:this={input}
    on:change={onChange}
    type="file"
    hidden
    id={uniqueLabel} />
</div>
