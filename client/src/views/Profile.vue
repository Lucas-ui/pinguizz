<template>
  <section class="relative max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row min-h-[60vh] p-6">
      <aside
        class="w-full sm:w-[30%] p-6 rounded-lg flex flex-col items-center"
      >
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
        <button
          class="btn bg-red-700 border-0 hover:bg-red-800 rounded-full"
          @click="showDeleteModal = true"
        >
          Supprimer mon compte
        </button>
      </aside>
      <div class="flex-1 ml-0 sm:ml-8 p-2 sm:p-6 rounded-lg">
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
          <div
            class="text-white rounded-md p-4 mt-5 mb-5 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
            v-if="errorMessage"
          >
            <div>
              <div class="text-sm text-[#1f2328]">
                {{ errorMessage }}
              </div>
            </div>
          </div>
          <div
            class="text-white rounded-md p-4 mt-5 mb-5 bg-gradient-to-r from-[#4bb54366] to-[#4bb54366] border border-[#4bb54366]'"
            v-if="successMessage"
          >
            <div>
              <div class="text-sm text-[#1f2328]">
                {{ successMessage }}
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <div class="mt-1 flex gap-2">
              <input
                v-model="nom"
                type="text"
                class="w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
              />
              <button
                @click="updateNom"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Valider
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Prénom</label
            >
            <div class="mt-1 flex gap-2">
              <input
                v-model="prenom"
                type="text"
                class="w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
              />
              <button
                @click="updatePrenom"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Valider
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Identifiant</label
            >
            <div class="mt-1 flex gap-2">
              <input
                v-model="username"
                type="text"
                class="w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
              />
              <button
                @click="updateUsername"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Valider
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="currentTab === 'password'" class="space-y-4">
          <div
            class="text-white rounded-md p-4 mt-5 mb-5 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
            v-if="errorMessage"
          >
            <div>
              <div class="text-sm text-[#1f2328]">
                {{ errorMessage }}
              </div>
            </div>
          </div>
          <div
            class="text-white rounded-md p-4 mt-5 mb-5 bg-gradient-to-r from-[#4bb54366] to-[#4bb54366] border border-[#4bb54366]'"
            v-if="successMessage"
          >
            <div>
              <div class="text-sm text-[#1f2328]">
                {{ successMessage }}
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nouveau mot de passe</label
            >
            <input
              type="password"
              v-model="newPassword"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Confirmer le mot de passe</label
            >
            <input
              type="password"
              v-model="confirmPassword"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
            />
          </div>
          <button
            class="bg-blue-600 text-white rounded-full cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            @click="updatePassword"
          >
            Modifier le mot de passe
          </button>
        </div>

        <div v-else-if="currentTab === 'history'" class="text-black space-y-4">
          <div v-if="historyData.length === 0">
            Vous n'avez pas encore effectué de quiz.
          </div>
          <div v-else>
            <div
              v-for="(quiz, index) in historyData"
              :key="quiz.id"
              class="rounded-lg p-4"
            >
              <p class="font-semibold">Quiz #{{ index + 1 }}</p>
              <p>
                Score :
                <span class="font-bold text-blue-600">{{ quiz.score }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h3 class="text-xl font-bold mb-4 text-red-700">
          Confirmer la suppression
        </h3>
        <p class="mb-6 text-gray-700">
          Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette
          action est irréversible.
        </p>
        <div class="flex justify-end space-x-4">
          <button
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            @click="showDeleteModal = false"
          >
            Annuler
          </button>
          <button
            class="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800 cursor-pointer"
            @click="deleteAccount"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { deleteUser } from "../api/user";
import { getQuizHistory } from "../api/party";
import {
  editPassword,
  editName,
  editFirstname,
  editUsername,
} from "../api/user";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";
const currentTab = ref("infos");
const nom = ref("");
const prenom = ref("");
const username = ref("");
const showDeleteModal = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");
const historyData = ref([]);
const errorMessage = ref("");
const successMessage = ref("");

const updatePassword = async () => {
  errorMessage.value = "";
  const data = {
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  };
  try {
    await editPassword(data);
    newPassword.value = "";
    confirmPassword.value = "";
    successMessage.value = "Mot de passe modifié avec succès.";
  } catch (error) {
    errorMessage.value = error.response.data.error;
    newPassword.value = "";
    confirmPassword.value = "";
    console.error(error);
  }
};

const updateNom = async () => {
  const data = {
    name: nom.value,
  };
  try {
    await editName(data);
    authStore.updateUser({ name: nom.value });
    successMessage.value = "Nom modifié avec succès.";
  } catch (error) {
    errorMessage.value = "Erreur lors de la modification du nom.";
    console.error(error);
  }
};

const updatePrenom = async () => {
  const data = {
    firstname: prenom.value,
  };
  try {
    await editFirstname(data);
    authStore.updateUser({ firstname: prenom.value });
    successMessage.value = "Prénom modifié avec succès.";
  } catch (error) {
    errorMessage.value = "Erreur lors de la modification du prénom.";
    console.error(error);
  }
};

const updateUsername = async () => {
  const data = {
    username: username.value,
  };
  try {
    await editUsername(data);
    authStore.updateUser({ username: username.value });
    successMessage.value = "Identifiant modifié avec succès.";
  } catch (error) {
    errorMessage.value = "Erreur lors de la modification de l'identifiant.";
    console.error(error);
  }
};

const deleteAccount = async () => {
  showDeleteModal.value = false;
  try {
    await deleteUser();
    authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};

const getHistory = async () => {
  try {
    const response = await getQuizHistory();
    historyData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

getHistory();

watch(
  user,
  (val) => {
    if (val) {
      nom.value = val.name || "";
      prenom.value = val.firstname || "";
      username.value = val.username || "";
    }
  },
  { immediate: true }
);
</script>
