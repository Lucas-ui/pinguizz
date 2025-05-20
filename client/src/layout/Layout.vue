<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <router-view key="$route.path" />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";

const route = useRoute();
</script>
