<template>
  <section class="relative max-w-7xl mx-auto">
    <div class="flex min-h-screen p-6">
      <aside class="w-[30%] p-6 rounded-lg flex flex-col items-center">
        <img
          class="w-24 h-24 mb-4 rounded-full object-cover"
          src="../assets/images/pinguizz_logo.png"
          alt="Logo"
        />
        <h2 class="text-xl font-bold text-center text-black mb-3">
          Nom d'utilisateur
        </h2>
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
              >Identifiants</label
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
import { ref } from "vue";

const currentTab = ref("infos");
</script>
