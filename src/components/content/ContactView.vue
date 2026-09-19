<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useClipboard } from '@/composables/useClipboard'
import profile from '@/data/profile.json'
import { hireMailto } from '@/lib/mailto'
import { showNotice } from '@/stores/workspace'

const { copy } = useClipboard()
const whatsappRevealed = ref(false)

const pingHref = computed(() => hireMailto(profile))

const iconColors = {
  email: 'var(--color-accent)',
  whatsapp: '#25d366',
  github: '#a78bfa',
  location: 'var(--color-fg-subtle)',
}

const methods = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    note: profile.contact.emailNote,
    icon: 'mail',
    copy: true,
    ping: true,
  },
  ...profile.links.map((link) => ({
    id: link.id,
    label: link.label,
    value: link.handle,
    masked: link.masked,
    href: link.url,
    note: link.note,
    icon: link.icon,
    external: true,
    reveal: link.id === 'whatsapp',
  })),
  {
    id: 'location',
    label: 'Location',
    value: profile.location,
    note: profile.contact.locationNote,
    icon: 'location',
  },
]

function isHidden(method) {
  return method.reveal && !whatsappRevealed.value
}

function surfaceFor(method) {
  if (isHidden(method)) return { tag: 'button', attrs: { type: 'button' } }
  if (method.href) {
    return {
      tag: 'a',
      attrs: {
        href: method.href,
        target: method.external ? '_blank' : undefined,
        rel: method.external ? 'noopener noreferrer' : undefined,
      },
    }
  }
  return { tag: 'div', attrs: {} }
}

const rows = computed(() =>
  methods.map((method) => ({
    ...method,
    hidden: isHidden(method),
    surface: surfaceFor(method),
    displayValue: isHidden(method) ? method.masked : method.value,
    displayNote: isHidden(method)
      ? profile.contact.whatsappRevealNote
      : method.note,
    iconColor: iconColors[method.id] || 'var(--color-fg)',
  })),
)

function onSurfaceClick(method) {
  if (isHidden(method)) whatsappRevealed.value = true
}

async function onCopyEmail() {
  const ok = await copy(profile.email)
  if (ok) showNotice(profile.contact.copyNotice)
}
</script>

<template>
  <article class="view view--centered stagger-enter">
    <header class="view__header">
      <h1 class="view__title">Contact</h1>
    </header>
    <p class="view__lede">{{ profile.contact.lede }}</p>

    <ul class="contact-list">
      <li
        v-for="(row, index) in rows"
        :key="row.id"
        class="contact-item"
        :class="`contact-item--${row.id}`"
        :style="{ animationDelay: `${index * 60}ms` }"
      >
        <component
          :is="row.surface.tag"
          class="contact-item__surface"
          v-bind="row.surface.attrs"
          @click="onSurfaceClick(row)"
        >
          <span
            class="contact-item__icon"
            :style="{ color: row.iconColor }"
            aria-hidden="true"
          >
            <AppIcon :name="row.icon" :size="22" />
          </span>

          <span class="contact-item__body">
            <button
              v-if="row.copy"
              type="button"
              class="contact-item__value contact-item__value--action mono"
              translate="no"
              @click.stop="onCopyEmail"
            >
              {{ row.value }}
            </button>
            <span v-else class="contact-item__value mono" translate="no">
              {{ row.displayValue }}
            </span>
            <span class="contact-item__note">{{ row.displayNote }}</span>
          </span>

          <AppButton
            v-if="row.ping"
            class="contact-item__ping"
            variant="primary"
            icon="mail"
            :href="pingHref"
          >
            {{ profile.contact.pingLabel }}
          </AppButton>
          <AppIcon
            v-else-if="row.hidden"
            class="contact-item__trailing"
            name="eye-off"
            :size="18"
          />
          <AppIcon
            v-else-if="row.href"
            class="contact-item__trailing"
            name="link-external"
            :size="16"
          />
        </component>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.contact-list {
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.contact-item {
  position: relative;
  border-bottom: 1px solid var(--color-border);
  animation: fade-up var(--duration-entrance) var(--ease-entrance) both;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 1;
  width: 3px;
  background: var(--color-accent);
  transform: scaleY(0);
  transition: transform var(--duration-base) var(--ease-spring);
}

.contact-item:hover {
  background: var(--color-hover);
}

.contact-item:hover::before {
  transform: scaleY(1);
}

.contact-item__surface {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-4);
  align-items: center;
  width: 100%;
  padding: var(--space-5);
  color: inherit;
  text-align: left;
  background: transparent;
  border: 0;
}

a.contact-item__surface,
button.contact-item__surface {
  cursor: pointer;
}

.contact-item__surface:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.contact-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-highlight);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: transform var(--duration-base) var(--ease-spring);
}

.contact-item:hover .contact-item__icon {
  transform: scale(1.05);
}

.contact-item__body {
  min-width: 0;
  overflow: hidden;
}

.view__lede {
  max-width: none;
  white-space: nowrap;
}

.contact-item__value {
  display: block;
  margin-top: 2px;
  color: var(--color-fg);
  font-size: var(--text-md);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-item__value--action {
  padding: 0;
  text-align: left;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.contact-item__note {
  display: block;
  margin-top: var(--space-1);
  color: var(--color-fg-subtle);
  font-size: var(--text-sm);
}

.contact-item__trailing {
  color: var(--color-fg-subtle);
  transition: color var(--duration-fast) var(--ease-out);
}

.contact-item:hover .contact-item__trailing {
  color: var(--color-fg);
}

.contact-item__ping :deep(.app-button) {
  animation: glow-pulse 2s ease-in-out infinite;
}

@media (max-width: 767px) {
  .view__lede {
    max-width: 100%;
    margin-bottom: var(--space-5);
    font-size: var(--text-base);
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .contact-list {
    background: transparent;
    border: 0;
    border-radius: 0;
  }

  .contact-item::before {
    display: none;
  }

  .contact-item__surface {
    grid-template-columns: auto 1fr auto;
    gap: var(--space-3);
    align-items: center;
    padding: var(--space-4) 0;
  }

  .contact-item__icon {
    width: 34px;
    height: 34px;
    background: transparent;
    border: 0;
  }

  .contact-item__icon .app-icon {
    width: 20px;
    height: 20px;
  }

  .contact-item__label {
    font-size: 11px;
  }

  .contact-item__value {
    font-size: var(--text-base);
  }

  .contact-item__note {
    font-size: var(--text-xs);
  }

  .contact-item__trailing {
    display: inline-flex;
    align-self: center;
    color: var(--color-fg-muted);
  }

  .contact-item__ping {
    grid-column: 2;
    justify-self: start;
    margin-top: var(--space-2);
  }
}
</style>
