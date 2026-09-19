<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useMediaQuery } from '@/composables/useMediaQuery'

const props = defineProps({
  resumePath: { type: String, default: 'Md-Mostaqim-Hasib-Resume.pdf' },
})

const emit = defineEmits(['download'])

const isMobile = useMediaQuery('(max-width: 767px)')

function download() {
  const link = document.createElement('a')
  link.href = props.resumePath
  link.download = props.resumePath.split('/').pop() || 'Md-Mostaqim-Hasib-Resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  emit('download')
}
</script>

<template>
  <article class="view view--centered">
    <header class="view__header">
      <h1 class="view__title">Resume</h1>
      <AppButton variant="primary" icon="cloud-download" @click="download">
        Download PDF
      </AppButton>
    </header>
    <p class="view__lede">
      One page, most recent first. Download a copy or open it in a new tab.
    </p>

    <div class="resume-frame">
      <div class="resume-frame__bar">
        <AppIcon name="file-pdf" :size="14" />
        <span class="mono" translate="no">Md-Mostaqim-Hasib-Resume.pdf</span>
      </div>

      <div v-if="isMobile" class="resume-frame__notice">
        <p class="resume-frame__notice-text">
          In-browser PDF preview is unreliable on mobile. Open the file or
          download a copy instead.
        </p>
        <div class="resume-frame__actions">
          <AppButton
            variant="primary"
            icon="link-external"
            :href="resumePath"
            target="_blank"
          >
            Open PDF
          </AppButton>
          <AppButton variant="secondary" icon="cloud-download" @click="download">
            Download
          </AppButton>
        </div>
      </div>

      <object
        v-else
        class="resume-frame__viewer"
        :data="resumePath"
        type="application/pdf"
        aria-label="Resume PDF preview"
      >
        <p class="resume-frame__fallback">
          Your browser cannot preview PDFs.
          <a :href="resumePath" target="_blank" rel="noopener noreferrer" translate="no">
            Open Md-Mostaqim-Hasib-Resume.pdf
          </a>
        </p>
      </object>
    </div>
  </article>
</template>

<style scoped>
.resume-frame {
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.resume-frame__bar {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2) var(--space-4);
  color: var(--color-fg-muted);
  background: var(--color-sidebar);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-xs);
}

.resume-frame__viewer {
  display: block;
  width: 100%;
  height: 70vh;
  min-height: min(420px, 70dvh);
  background: var(--color-bg);
}

.resume-frame__notice {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
}

.resume-frame__notice-text {
  max-width: 48ch;
  color: var(--color-fg-muted);
}

.resume-frame__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.resume-frame__fallback {
  padding: var(--space-6);
  color: var(--color-fg-muted);
  text-align: center;
}
</style>
