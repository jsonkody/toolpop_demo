<template>
  <div class="demo-container">
    <h1>💬 Toolpop Demo</h1>
    <p class="subtitle">Simple Vue 3 tooltip & popover directive</p>

    <!-- Basic Examples -->
    <section class="section">
      <h2>📌 Basic Tooltips</h2>

      <div class="example-row">
        <p v-pop="'Simple hover tooltip'">Hover me</p>

        <button v-pop="`Count: ${count}`" @click="count++">
          Reactive ({{ count }})
        </button>

        <p v-pop.clickout="'Click outside to close'">Sticky tooltip</p>
      </div>
    </section>

    <!-- Click Tooltips -->
    <section class="section">
      <h2>🖱️ Click Tooltips</h2>

      <div class="example-row">
        <button v-pop.click="'Closes on mouseout'">.click</button>

        <button v-pop.click.clickout="'Closes on click outside'">
          .click.clickout
        </button>
      </div>
    </section>

    <!-- HTML Content -->
    <section class="section">
      <h2>🎨 HTML Content</h2>

      <div class="example-row">
        <p v-pop:left.html="imageHtml">.html</p>

        <p v-pop:top.html.clickout="imageHtml">.html.clickout</p>

        <p v-pop:right.html.clickany="imageHtml">.html.clickany</p>
      </div>
    </section>

    <!-- Interactive Menus -->
    <section class="section">
      <h2>📱 Interactive Menus</h2>

      <div class="example-row">
        <button v-pop:bottom.html="simpleMenu">Simple menu</button>

        <button v-pop:bottom.html.click.clickany="simpleMenu">
          Click menu
        </button>

        <button v-pop:bottom.html.click.clickany.mouseinlock="cartMenu">
          Smart menu (.mouseinlock)
        </button>
      </div>

      <div class="info-box">
        <strong>.mouseinlock:</strong> Click anywhere to close, but after
        clicking inside menu → closes only on mouseout
      </div>
    </section>

    <!-- Positioning -->
    <section class="section">
      <h2>📍 Positioning</h2>

      <div class="example-row positioning">
        <button v-pop:top="'Top'">Top</button>
        <button v-pop:right="'Right'">Right</button>
        <button v-pop:bottom="'Bottom'">Bottom</button>
        <button v-pop:left="'Left'">Left</button>
      </div>
    </section>

    <!-- Language Toggle -->
    <section class="section">
      <h2>🌍 Reactive Content</h2>

      <button
        v-pop:bottom="
          `${$t('Switch to', 'Přepnout na')} ${other_lang().toUpperCase()}`
        "
        @click="toggle_lang"
      >
        {{ $t('Language', 'Jazyk') }}: {{ lang }}
      </button>
    </section>

    <!-- Empty Text Demo -->
    <section class="section">
      <h2>🔍 Edge Cases</h2>

      <div class="example-row">
        <button v-pop="empty_text" @click="swap_empty">
          <span class="font-normal">Empty tooltip test</span>
          <div class="hr"></div>
          <span>Click to toggle</span>
        </button>
        <input
          v-model="empty_text"
          type="text"
          placeholder="Type to show tooltip..."
        />
      </div>
    </section>

    <!-- Draggable Element -->
    <aside
      v-pop="
        $t(
          'Drag me to test auto-positioning',
          'Přesuň mě pro test auto-pozicování'
        )
      "
      ref="el"
      :style="style"
    >
      🎯 {{ $t('Drag me', 'Přesuň mě') }}
    </aside>

    <!-- Links -->
    <div class="links">
      <a target="_blank" href="https://github.com/jsonkody/toolpop">
        <IconBrandGithub v-pop="'GitHub'" class="link-icon" />
      </a>
      <a target="_blank" href="https://www.npmjs.com/package/toolpop">
        <IconPackage v-pop="'npm'" class="link-icon" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconPackage } from '@tabler/icons-vue';
import { useDraggable } from '@vueuse/core';
import { ref, useTemplateRef, computed } from 'vue';

const count = ref(0);

// Image HTML
const imageHtml = `<img src="/images/beki_smile.avif" style="max-width: 300px; border-radius: 8px; display: block;">`;

// Simple menu
const simpleMenu = `
<div style="background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 4px; min-width: 160px;">
  <button onclick="alert('✏️ Edit')" class="menu-item">✏️ Edit</button>
  <button onclick="alert('🗑️ Delete')" class="menu-item">🗑️ Delete</button>
  <button onclick="alert('🔗 Share')" class="menu-item">🔗 Share</button>
</div>
`;

// Cart menu (interactive with controls) - demonstrates .mouseinlock
const cartCount = ref(1);
const cartMenu = computed(
  () => `
<div style="background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); padding: 16px; min-width: 250px;">
  <h3 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">🛒 Shopping Cart</h3>
  
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <button onclick="document.querySelector('#cart-count').textContent = Math.max(1, parseInt(document.querySelector('#cart-count').textContent) - 1)" 
            style="width: 32px; height: 32px; border: 1px solid #ddd; background: #f9f9f9; border-radius: 6px; cursor: pointer; font-size: 18px;">−</button>
    <span id="cart-count" style="font-size: 18px; font-weight: 500; min-width: 24px; text-align: center;">${cartCount.value}</span>
    <button onclick="document.querySelector('#cart-count').textContent = parseInt(document.querySelector('#cart-count').textContent) + 1" 
            style="width: 32px; height: 32px; border: 1px solid #ddd; background: #f9f9f9; border-radius: 6px; cursor: pointer; font-size: 18px;">+</button>
  </div>
  
  <button onclick="alert('Added to cart: ' + document.querySelector('#cart-count').textContent + ' items')" 
          style="width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px;">
    Add to Cart
  </button>
  
  <p style="margin: 12px 0 0 0; font-size: 12px; color: #999; text-align: center;">
    Click inside to interact, mouseout to close
  </p>
</div>
`
);

// Empty text demo
const empty_text = ref('');
const show_text = ref(true);
const empty_swap = ref('pon pon pata pon');

function swap_empty() {
  show_text.value = !show_text.value;

  if (show_text.value) {
    empty_swap.value = empty_text.value;
    empty_text.value = '';
    return;
  }

  empty_text.value = empty_swap.value;
  empty_swap.value = '';
}

// i18n
type Lang = 'en' | 'cs';
const lang = ref<Lang>('en');

const $t = (en: string, cs: string) => {
  return lang.value === 'en' ? en : cs;
};

const toggle_lang = () => {
  lang.value = lang.value === 'cs' ? 'en' : 'cs';
};

const other_lang = (): Lang => {
  return lang.value === 'en' ? 'cs' : 'en';
};

// Draggable
const el = useTemplateRef<HTMLElement>('el');
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 15, y: 15 },
  preventDefault: true,
});
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 8px 0;
  color: #345677;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 40px 0;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 1.4rem;
  margin: 0 0 16px 0;
  color: #345677;
  text-align: left;
  border: none;
  padding: 0;
}

.section h2:hover {
  background: none;
  border: none;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.example-row.positioning {
  gap: 8px;
}

.info-box {
  margin-top: 12px;
  padding: 12px;
  background: rgba(99, 102, 241, 0.1);
  border-left: 3px solid #6366f1;
  border-radius: 4px;
  text-align: left;
  font-size: 0.95rem;
  color: #333;
}

.info-box strong {
  color: #6366f1;
}

input {
  flex: 1;
  min-width: 200px;
}

aside {
  position: fixed;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  cursor: grab;
  user-select: none;
  font-weight: 500;
}

aside:active {
  cursor: grabbing;
}
</style>

<style>
/* Global menu item styles */
.menu-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  transition: background-color 0.15s;
  margin: 2px 0;
}

.menu-item:hover {
  background: #f3f4f6 !important;
  border: none !important;
}
</style>
