<template>
  <HomeConnected v-if="isAuthenticated" />
  <HomeGuest v-else />
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import HomeConnected from "./HomeConnected.vue";
import HomeGuest from "./HomeGuest.vue";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>
