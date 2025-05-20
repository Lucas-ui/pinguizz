<template>
  <div class="relative min-h-screen py-10 md:py-12">
    <div class="container relative">
      <div class="mb-10 text-center">
        <h1
          class="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent !text-transparent md:text-5xl"
        >
          Nos thèmes
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-gray-600">
          Choisis un thème pour commencer à explorer les modules et démarrer un
          quiz. Chaque thème contient plusieurs modules.
        </p>
      </div>
      <SearchTheme />
      <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <CardTheme />
        <CardTheme />
        <CardTheme />
        <CardTheme />
        <CardTheme />
        <CardTheme />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardTheme from "../components/CardTheme.vue";
import SearchTheme from "../components/SearchTheme.vue";
</script>
