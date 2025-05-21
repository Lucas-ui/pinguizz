<template>
  <section class="relative max-w-7xl mx-auto">
    <div class="flex min-h-screen p-6">
      <aside class="w-[30%] p-6 rounded-lg flex flex-col items-center">
        <img
          v-if="user && user.image"
          class="w-24 h-24 mb-4 rounded-full object-cover shadow-md"
          :src="`${apiUrl}/images/avatar/${user.image}`"
          alt="Image de profil"
        />
        <h2 v-if="user" class="text-xl font-bold text-center text-black mb-3">
          {{ user.firstname }} {{ user.name }}
        </h2>
        <h3 v-if="user" class="text-lg text-center text-black mb-3">
          {{ user.username }}
        </h3>
        <button class="btn bg-red-700 border-0 hover:bg-red-800 rounded-full">
          Supprimer mon compte
        </button>
      </aside>
      <div class="flex-1 ml-8 p-6 rounded-lg">
        <div class="border-b mb-4">
          <nav class="flex space-x-4 text-black">
            <button
              class="cursor-pointer"
              :class="[
                'py-2 px-4 font-semibold',
                currentTab === 'infos'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500',
              ]"
              @click="currentTab = 'infos'"
            >
              Infos personnelles
            </button>
            <button
              class="cursor-pointer"
              :class="[
                'py-2 px-4 font-semibold',
                currentTab === 'password'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500',
              ]"
              @click="currentTab = 'password'"
            >
              Mot de passe
            </button>
            <button
              class="cursor-pointer"
              :class="[
                'py-2 px-4 font-semibold',
                currentTab === 'history'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500',
              ]"
              @click="currentTab = 'history'"
            >
              Historique des quiz
            </button>
          </nav>
        </div>

        <div v-if="currentTab === 'infos'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Prénom</label
            >
            <input
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Identifiant</label
            >
            <input
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <button
            class="bg-blue-600 text-white cursor-pointer rounded-full px-4 py-2 rounded hover:bg-blue-700"
          >
            Modifier mes informations
          </button>
        </div>

        <div v-else-if="currentTab === 'password'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nouveau mot de passe</label
            >
            <input
              type="password"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Confirmer le mot de passe</label
            >
            <input
              type="password"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <button
            class="bg-blue-600 text-white rounded-full cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
          >
            Modifier le mot de passe
          </button>
        </div>

        <div v-else-if="currentTab === 'history'" class="text-gray-500">
          Historique des quiz à venir...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";
const currentTab = ref("infos");
</script>
