<template>
  <section class="max-w-7xl mx-auto px-4 py-14">
    <h1 class="text-3xl text-[#0e5b8b] font-bold md:text-4xl text-center">
      Bonjour, <span v-if="user">{{ user.username }}</span> !
    </h1>
    <p class="mt-2 text-gray-600 text-center">
      Découvre comment fonctionnent les quiz sur Pinguiz !
    </p>
    <img
      src="../assets/images/img-home-header.png"
      alt="Hero Image"
      class="absolute w-22 top-25 right-0 sm:w-48 h-auto"
    />
    <div class="mt-8 bg-blue-50 p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-semibold text-blue-700 mb-4">Règles du quiz</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>Chaque quiz contient 15 questions aléatoires.</li>
        <li>Vous avez un temps limité pour répondre à chaque question.</li>
        <li>Vous obtenez un score à la fin du quiz.</li>
        <li>Vous pouvez rejouer un quiz à tout moment.</li>
      </ul>
    </div>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
      <div>
        <div
          class="rounded-lg bg-card text-card-foreground h-full border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex flex-col space-y-1.5 p-6">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-book-open h-6 w-6 text-blue-600"
                >
                  <path d="M12 7v14"></path>
                  <path
                    d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                  ></path>
                </svg>
              </div>
              <div
                class="text-2xl font-semibold leading-none tracking-tight text-blue-600"
              >
                Comment jouer
              </div>
            </div>
          </div>
          <div class="p-6 pt-0 space-y-3">
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Choisis un thème qui t'intéresse
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Sélectionne un module spécifique
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Réponds aux questions une par une
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Consulte tes résultats à la fin
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="rounded-lg bg-card text-card-foreground h-full border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex flex-col space-y-1.5 p-6">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-target h-6 w-6 text-orange-600"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div
                class="text-2xl font-semibold leading-none tracking-tight text-orange-600"
              >
                Suivi des résultats
              </div>
            </div>
          </div>
          <div class="p-6 pt-0 space-y-4">
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Ton score s'affiche à la fin de chaque quiz
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check-big h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Tous tes résultats sont sauvegardés automatiquement
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trophy h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path
                  d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
                ></path>
                <path
                  d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
                ></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Consulte ton historique complet dans ton profil
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="rounded-lg bg-card text-card-foreground h-full border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex flex-col space-y-1.5 p-6">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right h-6 w-6 text-blue-600"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <div
                class="text-2xl font-semibold leading-none tracking-tight text-blue-600"
              >
                Navigation
              </div>
            </div>
          </div>
          <div class="p-6 pt-0 space-y-3">
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-clock h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <p class="text-sm text-gray-600">
                Prends ton temps, il n'y a pas de limite
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-rotate-ccw h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
              >
                <path
                  d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                ></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Tu peux revenir aux questions précédentes
              </p>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-x h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
              <p class="text-sm text-gray-600">
                Attention : quitter perdra tes progrès
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <RouterLink to="/themes">
        <button
          class="btn bg-[#f35e21] mx-auto hover:bg-[#e55215] border-0 rounded-full"
        >
          Démarrer un quiz
        </button>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import CardTheme from "../components/CardTheme.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
