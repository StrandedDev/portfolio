<script setup>
import { computed } from 'vue'
import { tokenizeJson } from '@/lib/highlight'

const props = defineProps({
  data: { type: Object, required: true },
})

const tokens = computed(() => tokenizeJson(props.data))
</script>

<template>
  <div class="about-json" aria-hidden="true">
    <div class="about-json__bar">
      <span class="about-json__dot"></span>
      <span class="about-json__dot"></span>
      <span class="about-json__dot"></span>
      <span class="about-json__name">profile.json</span>
    </div>
    <pre class="about-json__code mono"><code><template v-for="(token, index) in tokens" :key="index"><span v-if="token.type !== 'plain'" class="tok" :class="`tok--${token.type}`">{{ token.text }}</span><template v-else>{{ token.text }}</template></template></code></pre>
  </div>
</template>

<style scoped>
.about-json {
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  animation: fade-up var(--duration-base) var(--ease-out) both;
}

.about-json__bar {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2) var(--space-4);
  background: var(--color-sidebar);
  border-bottom: 1px solid var(--color-border);
}

.about-json__dot {
  width: 11px;
  height: 11px;
  background: var(--color-border-strong);
  border-radius: 50%;
}

.about-json__dot:first-child {
  background: #ff5f57;
}

.about-json__dot:nth-child(2) {
  background: #febc2e;
}

.about-json__dot:nth-child(3) {
  background: #28c840;
}

.about-json__name {
  margin-left: var(--space-2);
  color: var(--color-fg-muted);
  font-size: var(--text-xs);
}

.about-json__code {
  margin: 0;
  padding: var(--space-5);
  overflow-x: auto;
  font-size: var(--text-base);
  line-height: var(--line-base);
  tab-size: 2;
}
</style>
