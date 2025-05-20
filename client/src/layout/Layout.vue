<template>
  <div class="relative z-0 w-full min-h-screen overflow-hidden">
    <GradientBackground />
    <WaveBackground />
    <ParticleBackground />

    <div class="flex flex-col min-h-screen">
      <Header />
      <div class="flex-1">
        <router-view key="$route.path" />
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
</script>
