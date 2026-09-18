<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 16 },
})
</script>

<template>
  <i
    class="codicon"
    :class="`codicon-${name}`"
    :style="{ fontSize: `${size}px` }"
    aria-hidden="true"
  ></i>
</template>
