<template>
  <div class="relative z-0 w-full min-h-screen overflow-hidden">
    <GradientBackground />
    <WaveBackground />
    <ParticleBackground />

    <div class="flex flex-col min-h-screen">
      <Header />
      <div class="flex-1">
        <transition name="fade" mode="out-in" appear>
          <router-view :key="route.fullPath" />
        </transition>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";

import ParticleBackground from "../components/ParticleBackground.vue";
import GradientBackground from "../components/GradientBackground.vue";
import WaveBackground from "../components/WaveBackground.vue";

const route = useRoute();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
