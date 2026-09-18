<script setup>
import { computed } from 'vue'
import { icons } from '@/lib/icons'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 16 },
})

const icon = computed(() => icons[props.name] ?? icons.file)
</script>

<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    :viewBox="icon.viewBox"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(path, index) in icon.paths"
      :key="index"
      :d="path.d"
      :fill-rule="path.fillRule"
      :clip-rule="path.clipRule"
    />
  </svg>
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
