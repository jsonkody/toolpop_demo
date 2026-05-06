<template>
   <!-- Basic usage -->
   <p v-pop="'Simple tooltip'">Hover me</p>

   <!-- Reactive content -->
   <button v-pop="`Count is ${count}`" @click="count += 1">
      Counter ({{ count }})
   </button>

   <!-- Testing HTML rendering -->
   <p v-pop:right.html="img_1">.html modifier (Image)</p>

   <!-- Testing reactivity with language change -->
   <h2 v-pop="$t('Does it update on language change?', 'Mění se to při změně jazyka?')">
      {{ $t('Testing languages', 'Testuji jazyky') }}
   </h2>
   <button
      v-pop:bottom="
         $t('Click to toggle language', 'Kliknutím změň jazyk') +
         ` ..  ${other_lang().toUpperCase()}`
      "
      @click="toggle_lang"
   >
      {{ $t('Language', 'Jazyk') }}: {{ lang.toUpperCase() }}
   </button>

   <!-- Modifiers: explicit click and touch handling -->
   <button v-pop.click="'Shows on click (desktop & mobile). Closes on mouse leave or outside click.'">
      .click
   </button>

   <button v-pop:bottom.click.outside="'Persistent popover. Stays open until you click outside or press Escape.'">
      .click.outside
   </button>

   <button v-pop:bottom.touch="'Shows on tap on mobile devices. On desktop, behaves like a standard hover/focus tooltip.'">
      .touch
   </button>

   <!-- Placements showcase -->
   <div
      style="
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 1rem;
         flex-wrap: wrap;
         margin: 1.5rem 0;
      "
   >
      <button v-pop:top-start="$t('Aligned to start', 'Zarovnáno na začátek')">
         top-start
         <div class="top-start"></div>
      </button>
      <button v-pop:bottom-end="$t('Aligned to end', 'Zarovnáno na konec')">
         bottom-end
         <div class="bottom-end"></div>
      </button>
      <button v-pop:right-start="$t('Aligned to start', 'Zarovnáno na začátek')">
         right-start
         <div class="right-start"></div>
      </button>
      <button v-pop:left-end="$t('Aligned to end', 'Zarovnáno na konec')">
         left-end
         <div class="left-end"></div>
      </button>
   </div>

   <p class="quote">
      Tapping on TAB should switch focus between focusable elements (like buttons) and trigger the tooltip.
   </p>
   <p class="quote">
      PS: The .click tooltip should not show just on tab-focus. An empty tooltip should never show - 
      type something in the input below first!
   </p>

   <!-- Testing empty tooltips logic -->
   <button v-pop="empty_text" @click="swap_empty">
      <div class="font-normal">Empty v-pop should not show</div>
      <div class="hr"></div>
      <div>Click to toggle text</div>
   </button>

   <input v-model="empty_text" type="text" placeholder="Type tooltip text here..." />

   <!-- Testing auto-update and boundaries via Floating UI middleware -->
   <aside
      v-pop="
         $t(
            'Drag me around to test flipping & shifting across the viewport boundary',
            'Chytni mě a otestuj překlápění a posouvání na viewportu',
         )
      "
      ref="el"
      :style="style"
      style="position: fixed; z-index: 50;"
   >
      {{ $t('Drag me', 'Chytni mě') }}
   </aside>

   <!-- External Links -->
   <div class="links">
      <a v-pop="'GitHub'" target="_blank" rel="noopener" href="https://github.com/jsonkody/toolpop">
         <IconBrandGithub class="link-icon" />
      </a>
      <a v-pop="'npm'" target="_blank" rel="noopener" href="https://www.npmjs.com/package/toolpop">
         <IconPackage class="link-icon" />
      </a>
   </div>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconPackage } from '@tabler/icons-vue'
import { useDraggable } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const count = ref(0)
const img_1 = `<img src="/images/beki_smile.avif" alt="Smile" style="border-radius: 4px; display: block;">`

// Logic for testing empty tooltips
const empty_text = ref('')
const empty_swap = ref('pon pon pata pon') // Placeholder text to swap with

function swap_empty() {
   // Simple swap of string values using destructuring array assignment
   [empty_text.value, empty_swap.value] = [empty_swap.value, empty_text.value]
}

// Lightweight i18n implementation for demonstration purposes
// Note: In a real-world application, consider using vue-i18n or a Pinia store
type Lang = 'en' | 'cs'
const lang = ref<Lang>('en')

const $t = (en: string, cs: string) => {
   return lang.value === 'en' ? en : cs
}

const toggle_lang = () => {
   lang.value = lang.value === 'cs' ? 'en' : 'cs'
}

const other_lang = (): Lang => {
   return lang.value === 'en' ? 'cs' : 'en'
}

// Draggable element setup to test Floating UI's autoUpdate, flip, and shift middleware
const el = useTemplateRef<HTMLElement>('el')
const { x, y, style } = useDraggable(el, {
   initialValue: { x: 15, y: 15 },
   preventDefault: true,
})
</script>