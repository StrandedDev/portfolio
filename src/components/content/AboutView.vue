<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import profile from '@/data/profile.json'
import { setHeroMode, useWorkspace } from '@/stores/workspace'
import AboutJson from './AboutJson.vue'
import AboutReader from './AboutReader.vue'
import Toggle from '@/components/ui/Toggle.vue'

const router = useRouter()
const workspace = useWorkspace()

const jsonMode = computed(() => workspace.heroMode === 'json')

function onToggle(value) {
  setHeroMode(value ? 'json' : 'reader')
}
</script>

<template>
  <article class="view about">
    <div class="view__header">
      <h1 class="visually-hidden">About {{ profile.name }}</h1>
      <Toggle
        :model-value="jsonMode"
        :labels="['Reader', 'JSON']"
        aria-label="About view mode"
        @update:model-value="onToggle"
      />
    </div>

    <div :class="{ 'visually-hidden': jsonMode }">
      <AboutReader
        :profile="profile"
        @open-resume="router.push('/resume')"
        @open-contact="router.push('/contact')"
      />
    </div>

    <Transition name="fade">
      <AboutJson v-if="jsonMode" :data="profile" />
    </Transition>
  </article>
</template>

<style scoped>
.view__header {
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
