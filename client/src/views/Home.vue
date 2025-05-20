<template>
  <main>
    <section
      class="text-black flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto"
    >
      <div class="left-part flex-1 flex flex-col justify-center">
        <p class="text-2xl font-bold mb-4">Bienvenue sur Pinguiz</p>
        <p class="text-lg mb-4">
          Testez vos connaissances sur une multitude de thèmes !
        </p>
        <button
          class="bg-blue-500 text-black rounded-md hover:bg-blue-600 transition w-fit"
        >
          Choisir un thème
        </button>
      </div>
      <div class="right-part flex-1 flex justify-center items-center">
        <img :src="HeroImage" alt="Hero Image" class="w-84 h-auto max-w-full" />
      </div>
    </section>
    <section>
      <p class="text-black">Thèmes populaires</p>
      <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <CardTheme />
        <CardTheme />
        <CardTheme />
      </div>
    </section>
  </main>
</template>

<script setup>
import HeroImage from "../assets/images/hero-image.png";
import CardTheme from "../components/CardTheme.vue";
</script>
