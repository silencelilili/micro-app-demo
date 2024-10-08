<template>
  <div>
    <img alt="Vue logo" :src="logoPath" />
    <h1>子应用 -- Vite+Vue@3.x</h1>
    <!-- <HelloWorld msg="子应用 -- Vite+Vue@3.x" /> -->
    <PdfViewer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import PdfViewer from "../components/PdfViewer.vue";
const logoPath = new URL("../assets/logo.png", import.meta.url).href;

export default defineComponent({
  name: "Home",
  setup() {
    return { logoPath };
  },
  components: {
    HelloWorld,
    PdfViewer,
  },
});
</script>

<style></style>
