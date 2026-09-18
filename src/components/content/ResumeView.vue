<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps({
  resumePath: { type: String, default: '/resume.pdf' },
})

const emit = defineEmits(['download'])

function download() {
  const link = document.createElement('a')
  link.href = props.resumePath
  link.download = props.resumePath.split('/').pop() || 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  emit('download')
}
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">Resume</h1>
      <AppButton variant="primary" icon="cloud-download" @click="download">
        Download PDF
      </AppButton>
    </header>
    <p class="view__lede">
      One page, most recent first. Download a copy or preview it below.
    </p>

    <div class="resume-frame">
      <div class="resume-frame__bar">
        <AppIcon name="file-pdf" :size="14" />
        <span class="mono">resume.pdf</span>
      </div>
      <object
        class="resume-frame__viewer"
        :data="resumePath"
        type="application/pdf"
        aria-label="Resume PDF preview"
      >
        <p class="resume-frame__fallback">
          Your browser cannot preview PDFs.
          <a :href="resumePath" target="_blank" rel="noopener noreferrer">
            Open resume.pdf
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
  min-height: 420px;
  background: var(--color-bg);
}

.resume-frame__fallback {
  padding: var(--space-6);
  color: var(--color-fg-muted);
  text-align: center;
}
</style>
