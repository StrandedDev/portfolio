<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import TechIcon from '@/components/ui/TechIcon.vue'
import { hireMailto } from '@/lib/mailto'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  profile: { type: Object, required: true },
  interactive: { type: Boolean, default: true },
})

defineEmits(['open-resume'])

const mailto = computed(() => hireMailto(props.profile))
const container = ref(null)

useScrollReveal(container)

// Category visual meta
const categoryMeta = {
  'Frontend & Mobile': {
    icon: 'symbol-color',
    tag: '~/stack/frontend-mobile',
    color: '#3794ff',
  },
  'Backend & Databases': {
    icon: 'symbol-method',
    tag: '~/stack/backend-data',
    color: '#a855f7',
  },
  'DevOps & Environments': {
    icon: 'terminal',
    tag: '~/stack/devops-systems',
    color: '#22c55e',
  },
  'AI & Engineering Tools': {
    icon: 'lightbulb',
    tag: '~/stack/ai-tooling',
    color: '#f59e0b',
  },
}
</script>

<template>
  <section ref="container" class="about-page stagger-enter">
    <!-- Hero Header: Asymmetrical 2-Column Grid -->
    <div class="hero-grid">
      <!-- Left: Focused Value Intro & Direct Hire CTA -->
      <div class="hero-intro">
        <div class="hero-intro__status-pill">
          <span class="hero-intro__pulse" aria-hidden="true"></span>
          <span class="hero-intro__status-text">{{ profile.status || profile.role }}</span>
        </div>

        <div class="hero-intro__heading-wrap">
          <span class="hero-intro__greeting" v-if="profile.greeting">{{ profile.greeting }}</span>
          <h1 class="hero-intro__name">{{ profile.name }}</h1>
        </div>

        <p class="hero-intro__tagline gradient-text">
          {{ profile.tagline }}
        </p>

        <!-- Single Focused Paragraph (No Fluff) -->
        <p class="hero-intro__summary">
          {{ profile.summary }}
        </p>

        <!-- Primary CTA: "Hire me", Secondary: "Resume" (No socials) -->
        <div class="hero-intro__actions">
          <AppButton
            variant="secondary"
            icon="cloud-download"
            :tabindex="interactive ? undefined : -1"
            @click="$emit('open-resume')"
          >
            Resume
          </AppButton>
          <AppButton
            variant="primary"
            icon="mail"
            class="hero-intro__hire"
            :href="mailto"
            :tabindex="interactive ? undefined : -1"
          >
            Hire me
          </AppButton>
        </div>
      </div>

      <!-- Right: Developer System Spec Card -->
      <div class="hero-spec scroll-reveal">
        <div class="hero-spec__card">
          <div class="hero-spec__header">
            <span class="hero-spec__terminal-dot red"></span>
            <span class="hero-spec__terminal-dot yellow"></span>
            <span class="hero-spec__terminal-dot green"></span>
            <span class="hero-spec__file-title mono">developer.spec</span>
          </div>

          <div class="hero-spec__body mono">
            <div
              v-for="spec in profile.specs"
              :key="spec.label"
              class="hero-spec__row"
            >
              <span class="hero-spec__label">{{ spec.label }}:</span>
              <span class="hero-spec__value">{{ spec.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Stack: Stacked Alternating Flow (Left / Right with Vertical Spacing) -->
    <div v-if="profile.skills && profile.skills.length" class="stack-showcase scroll-reveal">
      <div class="section-heading">
        <span class="section-heading__badge mono">// TECHNICAL ARSENAL</span>
        <h2 class="section-heading__title">Tech Stack & Specializations</h2>
        <p class="section-heading__desc">
          Core technologies, frameworks, and workflows I leverage to engineer production systems.
        </p>
      </div>

      <!-- Alternating Vertical Stack Track with Connecting Lines -->
      <div class="stack-track">
        <template
          v-for="(group, index) in profile.skills"
          :key="group.category"
        >
          <div
            class="stack-box"
            :class="[
              index % 2 === 0 ? 'stack-box--left' : 'stack-box--right',
              `stack-box--${index}`
            ]"
          >
            <!-- Terminal-style Header -->
            <div class="stack-box__header">
              <div class="stack-box__title-group">
                <span class="stack-box__tag mono">
                  {{ categoryMeta[group.category]?.tag || `~/stack/${index + 1}` }}
                </span>
                <h3 class="stack-box__title">{{ group.category }}</h3>
              </div>
              <span class="stack-box__count mono">{{ group.items.length }} tools</span>
            </div>

            <p v-if="group.description" class="stack-box__desc">
              {{ group.description }}
            </p>

            <!-- Large Prominent SVG Icon Tiles -->
            <div class="stack-box__grid">
              <div
                v-for="item in group.items"
                :key="item.name"
                class="tech-card"
              >
                <TechIcon
                  :name="item.name"
                  :icon="item.icon"
                  :custom="item.custom"
                  :size="32"
                />
                <span class="tech-card__name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- Connecting line from one box(node) to another -->
          <div
            v-if="index < profile.skills.length - 1"
            class="stack-connector"
            :class="index % 2 === 0 ? 'stack-connector--ltr' : 'stack-connector--rtl'"
            aria-hidden="true"
          >
            <svg class="stack-connector__svg" viewBox="0 0 500 80" preserveAspectRatio="none">
              <!-- Left-to-Right Connector (Box 0 -> Box 1, Box 2 -> Box 3) -->
              <path
                v-if="index % 2 === 0"
                d="M 212.5 0 C 212.5 48, 287.5 32, 287.5 80"
                class="stack-connector__line"
              />

              <!-- Right-to-Left Connector (Box 1 -> Box 2) -->
              <path
                v-else
                d="M 287.5 0 C 287.5 48, 212.5 32, 212.5 80"
                class="stack-connector__line"
              />
            </svg>
            <span class="stack-connector__mobile" aria-hidden="true"></span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 100%;
}

/* ==========================================================================
   Hero 2-Column Layout
   ========================================================================== */
.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: var(--space-7);
  align-items: start;
}

.hero-intro {
  display: flex;
  flex-direction: column;
}

.hero-intro__status-pill {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  align-self: flex-start;
  padding: 4px 12px;
  margin-bottom: var(--space-4);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  letter-spacing: 0.02em;
}

.hero-intro__pulse {
  position: relative;
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
}

.hero-intro__pulse::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: #22c55e;
  border-radius: 50%;
  opacity: 0.4;
  animation: pulse 2.4s var(--ease-out) infinite;
}

.hero-intro__heading-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: var(--space-3);
}

.hero-intro__greeting {
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--color-fg-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-intro__name {
  font-size: 36px;
  font-weight: 700;
  line-height: var(--line-tight);
  letter-spacing: -0.025em;
  color: var(--color-fg);
  transition: color var(--duration-base) var(--ease-out);
}

.hero-intro__name:hover {
  background: var(--gradient-text);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

.hero-intro__tagline {
  font-size: var(--text-base);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: var(--line-base);
  margin-bottom: var(--space-4);
  background-size: 200% auto;
  animation: shimmer 5s linear infinite;
}

.hero-intro__summary {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-fg);
  opacity: 0.92;
  margin-bottom: var(--space-6);
  max-width: 58ch;
}

.hero-intro__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Wider buttons on desktop */
@media (min-width: 768px) {
  .hero-intro__actions :deep(.app-button) {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
}

/* Hire me: drop glow, add looping shine sweep */
.hero-intro__actions .hero-intro__hire {
  position: relative;
  overflow: hidden;
  box-shadow: none;
}

.hero-intro__actions .hero-intro__hire::after {
  content: '';
  position: absolute;
  top: 0;
  left: -160%;
  width: 55%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 100%
  );
  transform: skewX(-20deg);
  pointer-events: none;
  animation: hire-shine 3.4s var(--ease-out) infinite;
}

@keyframes hire-shine {
  0% {
    left: -160%;
  }
  55% {
    left: 160%;
  }
  100% {
    left: 160%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-intro__actions .hero-intro__hire::after {
    animation: none;
  }
}

/* ==========================================================================
   Developer Spec Card (Inspector Panel)
   ========================================================================== */
.hero-spec {
  display: flex;
  flex-direction: column;
}

.hero-spec__card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.hero-spec__card:hover {
  box-shadow: var(--shadow-card-hover);
}

.hero-spec__header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--color-sidebar);
  border-bottom: 1px solid var(--color-border);
}

.hero-spec__terminal-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.hero-spec__terminal-dot.red {
  background: #ff5f57;
}

.hero-spec__terminal-dot.yellow {
  background: #febc2e;
}

.hero-spec__terminal-dot.green {
  background: #28c840;
}

.hero-spec__file-title {
  margin-left: 8px;
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  letter-spacing: 0.04em;
}

.hero-spec__body {
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-5);
  gap: var(--space-3);
  font-size: 13px;
}

.hero-spec__row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: var(--space-2);
  border-bottom: 1px dashed var(--color-border);
}

.hero-spec__row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.hero-spec__label {
  font-size: 11px;
  color: var(--syntax-key);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hero-spec__value {
  color: var(--color-fg);
  font-weight: 500;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

/* ==========================================================================
   Section Headings
   ========================================================================== */
.section-heading {
  margin-bottom: var(--space-6);
}

.section-heading__badge {
  display: inline-block;
  font-size: 11px;
  color: var(--color-accent);
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}

.section-heading__title {
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-fg);
}

.section-heading__desc {
  margin-top: 4px;
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  max-width: 65ch;
  line-height: var(--line-base);
}

/* ==========================================================================
   Stacked Alternating Categories (Left / Right with Vertical Spacing)
   ========================================================================== */
.stack-showcase {
  padding-top: var(--space-4);
}

.stack-track {
  display: flex;
  flex-direction: column;
  position: relative;
}

.stack-connector {
  position: relative;
  width: 100%;
  height: 140px; /* Larger gap between boxes for smoother lines */
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.stack-connector__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.stack-connector__line {
  fill: none;
  stroke: var(--highlight-white, #ffffff);
  opacity: 0.4;
  stroke-width: 2;
  stroke-dasharray: 6 4;
}

.stack-connector__mobile {
  display: none;
}

.stack-box {
  position: relative;
  width: 85%;
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

/* Box on the LEFT side */
.stack-box--left {
  margin-right: auto;
  margin-left: 0;
}

/* Box on the RIGHT side */
.stack-box--right {
  margin-left: auto;
  margin-right: 0;
}

.stack-box:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
}

.stack-box__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border);
}

.stack-box__title-group {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.stack-box__tag {
  font-size: 11px;
  color: var(--color-fg-muted);
  background: var(--color-highlight);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.stack-box__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-fg);
}

.stack-box__count {
  font-size: 11px;
  color: var(--color-fg-subtle);
  background: var(--color-highlight);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.stack-box__desc {
  font-size: 12.5px;
  color: var(--color-fg-muted);
  margin-bottom: var(--space-4);
  line-height: 1.4;
}

/* ==========================================================================
   Larger, Prominent Tech Tiles
   ========================================================================== */
.stack-box__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-card {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: default;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-spring),
    box-shadow var(--duration-fast) var(--ease-out);
}

.tech-card:hover {
  background: var(--color-hover);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.tech-card:hover :deep(.tech-icon) {
  transform: scale(1.12);
}

.tech-card__name {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-fg);
  letter-spacing: -0.01em;
}

/* ==========================================================================
   Animations & Keyframes
   ========================================================================== */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  70% {
    transform: scale(3.2);
    opacity: 0;
  }
  100% {
    transform: scale(3.2);
    opacity: 0;
  }
}

/* ==========================================================================
   Responsive Adaptations
   ========================================================================== */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .stack-track::before {
    display: none;
  }

  .stack-box {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  /* Straight vertical dashed line centered on the full-width boxes */
  .stack-connector {
    height: 56px;
    margin: 4px 0;
  }

  .stack-connector__svg {
    display: none;
  }

  .stack-connector__mobile {
    display: block;
    width: 0;
    height: 100%;
    border-left: 2px dashed var(--highlight-white, #ffffff);
    opacity: 0.4;
  }
}

@media (max-width: 767px) {
  /* Hero fills the viewport height; developer.spec sits below the fold */
  .hero-intro {
    justify-content: center;
    min-height: calc(100svh - 160px);
  }

  .hero-intro__status-pill {
    margin-bottom: var(--space-5);
  }

  .hero-intro__heading-wrap {
    margin-bottom: var(--space-4);
  }

  .hero-intro__name {
    font-size: 30px;
  }

  .hero-intro__tagline {
    margin-bottom: var(--space-5);
  }

  .hero-intro__summary {
    margin-bottom: var(--space-7);
  }

  .hero-intro__actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-3);
  }

  .hero-intro__actions :deep(.app-button) {
    width: 100%;
  }

  /* Push content below the hero down with extra breathing space */
  .hero-grid {
    gap: var(--space-7);
  }

  .hero-spec {
    margin-top: var(--space-7);
  }

  .stack-showcase {
    padding-top: var(--space-6);
  }

  .hero-spec__body {
    padding: var(--space-4);
  }

  .stack-box {
    padding: var(--space-4);
  }

  .stack-track {
    gap: var(--space-2);
  }

  .tech-card {
    padding: 8px 12px;
    gap: 10px;
  }
}
</style>
