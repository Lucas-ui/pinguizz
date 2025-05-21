<template>
  <section class="max-w-7xl mx-auto px-4 py-14">
    <h1 class="text-3xl text-[#0e5b8b] font-bold md:text-4xl">
      Bonjour, <span v-if="user">{{ user.username }}</span> !
    </h1>
    <p class="mt-2 text-gray-600">
      Continuez votre parcours d'apprentissage avec Pinguiz
    </p>
    <CardTheme />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import CardTheme from "../components/CardTheme.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
