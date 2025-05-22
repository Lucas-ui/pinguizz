<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-[#0e5b8b] mb-2">
        Dashboard Administrateur
      </h1>
      <p class="text-gray-600">
        Cette interface vous permet de gérer les utilisateurs et de consulter
        les résultats des quiz effectués.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-100 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-blue-800">Utilisateurs</h3>
        <p class="text-3xl font-bold text-blue-900 mt-2">{{ users.length }}</p>
      </div>
      <div class="bg-green-100 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-green-800">Quiz effectués</h3>
        <p class="text-3xl font-bold text-green-900 mt-2">128</p>
      </div>
    </div>
    <div class="mb-6">
      <div class="flex border-b">
        <button
          @click="activeTab = 'users'"
          :class="[
            'px-4 py-2 font-medium',
            activeTab === 'users'
              ? 'border-b-2 border-[#0e5b8b] text-[#0e5b8b]'
              : 'text-gray-500',
          ]"
        >
          Utilisateurs
        </button>
        <button
          @click="activeTab = 'quizzes'"
          :class="[
            'px-4 py-2 font-medium',
            activeTab === 'quizzes'
              ? 'border-b-2 border-[#0e5b8b] text-[#0e5b8b]'
              : 'text-gray-500',
          ]"
        >
          Quiz
        </button>
      </div>
    </div>
    <div v-if="activeTab === 'users'" class="overflow-x-auto">
      <table class="w-full table-auto border text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">Nom</th>
            <th class="px-4 py-2 text-left">Prénom</th>
            <th class="px-4 py-2 text-left">Identifiant</th>
            <th class="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.username"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2 text-black">{{ user.name }}</td>
            <td class="px-4 py-2 text-black">{{ user.firstname }}</td>
            <td class="px-4 py-2 text-black">{{ user.username }}</td>
            <td class="px-4 py-2">
              <button
                class="text-red-600 hover:underline cursor-pointer"
                @click="deleteUser(user.username)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto border text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">Utilisateur</th>
            <th class="px-4 py-2 text-left">Module du quiz</th>
            <th class="px-4 py-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="quiz in quizzes"
            :key="quiz.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ quiz.utilisateur }}</td>
            <td class="px-4 py-2">{{ quiz.titre }}</td>
            <td class="px-4 py-2">{{ quiz.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { allUsers, deleteUserAdmin } from "../api/user";
import { allQuizzes } from "../api/party";

const activeTab = ref("users");
const users = ref([]);
const quizzes = ref([]);

const fetchUsers = async () => {
  try {
    const response = await allUsers();
    users.value = response.data.users;
  } catch (error) {
    console.error(error);
  }
};

const fetchQuizzes = async () => {
  try {
    const response = await allQuizzes();
    quizzes.value = response.data.quizzes;
    console.log(response.data.quizzes);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (username) => {
  try {
    await deleteUserAdmin(username);
    users.value = users.value.filter((user) => user.username !== username);
  } catch (error) {
    console.error(error);
  }
};

fetchUsers();
fetchQuizzes();
</script>

<style scoped>
th,
td {
  min-width: 150px;
}
</style>
