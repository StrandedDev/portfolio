<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import profile from '@/data/profile.json'
import { setHeroMode, useWorkspace } from '@/stores/workspace'
import AboutReader from './AboutReader.vue'
import Toggle from '@/components/ui/Toggle.vue'

const AboutJson = defineAsyncComponent(() => import('./AboutJson.vue'))

const router = useRouter()
const workspace = useWorkspace()

const jsonMode = computed(() => workspace.heroMode === 'json')

function onToggle(value) {
  setHeroMode(value ? 'json' : 'reader')
}
</script>

<template>
  <article class="view about view--centered">
    <div class="view__header">
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
        :interactive="!jsonMode"
        @open-resume="router.push('/resume')"
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

@media (max-width: 767px) {
  .view__header {
    display: none;
  }
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
