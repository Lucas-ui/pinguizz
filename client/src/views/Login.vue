<template>
  <div
    class="relative flex flex-col justify-center overflow-hidden min-h-screen mt-[-100px]"
  >
    <div class="w-full p-6 m-auto rounded-md lg:max-w-lg">
      <Logo class="mx-auto" width="130px" height="auto" />
      <h1 class="text-3xl font-semibold text-center text-black mb-4">
        Se connecter à Pinguiz
      </h1>
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
      <form class="space-y-4" @submit.prevent="login">
        <div>
          <label class="label">
            <span class="text-base label-text text-black">Identifiant</span>
          </label>
          <input
            type="text"
            placeholder="Identifiant"
            v-model="username"
            class="w-full bg-transparent input input-bordered input-primary text-black"
          />
        </div>
        <div>
          <label class="label">
            <span class="text-base label-text text-black">Mot de passe</span>
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            v-model="password"
            class="w-full bg-transparent input input-bordered input-primary text-black"
          />
        </div>
        <div class="flex items-center">
          <button class="btn btn-primary mx-auto rounded-full">
            Se connecter
          </button>
        </div>
        <div>
          <p class="text-sm text-center text-gray-400">
            Vous n'avez pas de compte ?
            <RouterLink
              to="/registration"
              class="font-semibold text-orange-600 hover:text-orange-800 hover:underline"
            >
              Inscrivez-vous
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Logo from "../components/Logo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../api/auth";
import { infosUser } from "../api/auth";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  errorMessage.value = "";
  try {
    const data = {
      username: username.value,
      password: password.value,
    };

    const response = await loginUser(data);
    const token = response?.data?.user?.token;
    localStorage.setItem("authToken", token);
    const userResponse = await infosUser();
    authStore.setAuthenticated(true);
    authStore.setUser(userResponse.data);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.response.data.error;
    console.error(error);
  }
};
</script>
