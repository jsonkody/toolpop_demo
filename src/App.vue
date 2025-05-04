<template>
  <!-- just simple tooltip -->
  <p v-pop="'Simple tooltip'">Hover me</p>

  <!-- updating value of `count` in tooltip -->
  <button v-pop="`count is ${count}`" @click="count += 1">
    counter ({{ count }})
  </button>

  <h2
    v-pop="
      $t('Does it update on language change?', 'Mění se to při změně jazyka?')
    "
  >
    {{ $t("Testing languages", "Testuji jazyky") }}
  </h2>

  <button
    v-pop:bottom="
      $t('Click to toggle language', 'Kliknutím změň jazyk') +
      ` ..  ${other_lang().toUpperCase()}`
    "
    @click="toggle_lang"
  >
    {{ $t("lang", "jazyk") }}: {{ lang }}
  </button>

  <!-- click tooltip -->
  <p v-pop.click="'Simple tooltip'">.click</p>

  <!-- click tooltip -->
  <p v-pop.click.leave="'Simple tooltip'">.click.leave</p>

  <!-- <p v-pop:right.html.click="img_1">.html.click bekinka</p>

  <p v-pop:left.html.click.leave="img_2">.html.click.leave boo</p> -->

  <p v-pop:right.html="img_1">.html bekinka</p>

  <p v-pop:left.html="img_2">.html boo</p>

  <p v-pop="'   '">empty v-pop should not show</p>

  <aside
    v-pop="
      $t(
        'Drag me and test flipping & shifting on viewport',
        'Chytni mě a otestuj překlápění a posouvání na viewportu'
      )
    "
    ref="el"
    :style="style"
    style="position: fixed"
  >
    {{ $t("Drag me", "Chytni mě") }}
  </aside>

  <div class="links">
    <a target="_blank" href="https://github.com/jsonkody/toolpop"
      ><IconBrandGithub v-pop="'GitHub'" class="link-icon"
    /></a>
    <a target="_blank" href="https://www.npmjs.com/package/toolpop"
      ><IconPackage v-pop="'npm'" class="link-icon"
    /></a>
  </div>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconPackage } from "@tabler/icons-vue";
import { useDraggable } from "@vueuse/core";
import { ref, useTemplateRef } from "vue";

const count = ref(0);
const img_1 = `<img src="/images/beki_smile.avif">`;
const img_2 = `<img src="/images//boo.avif" style="border-radius: 99999px; border: 4px solid PaleGreen;">`;

type Lang = "en" | "cs";

// lightweight i18n - in real project you should use Pinia store
const lang = ref<Lang>("en");

const $t = (en: string, cs: string) => {
  return lang.value === "en" ? en : cs;
};

const toggle_lang = () => {
  lang.value = lang.value === "cs" ? "en" : "cs";
};

const other_lang = (): Lang => {
  return lang.value === "en" ? "cs" : "en";
};

const el = useTemplateRef<HTMLElement>("el");
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 15, y: 15 },
  preventDefault: true,
});
</script>
