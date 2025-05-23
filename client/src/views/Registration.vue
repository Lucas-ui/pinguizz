<template>
  <div
    class="relative flex flex-col justify-center overflow-hidden min-h-screen mt-[-60px]"
  >
    <div class="w-full p-6 m-auto rounded-md lg:max-w-lg">
      <Logo class="mx-auto" width="130px" height="auto" />
      <h1 class="text-3xl font-semibold text-center text-black mb-4">
        S'inscrire à Pinguiz
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
      <form class="space-y-4" @submit.prevent="registration">
        <div class="flex space-x-4">
          <div class="w-1/2">
            <label class="label">
              <span class="text-base label-text text-black">Nom</span>
            </label>
            <input
              type="text"
              placeholder="Nom"
              v-model="lastName"
              class="w-full bg-transparent input input-bordered input-primary text-black"
              required
            />
          </div>
          <div class="w-1/2">
            <label class="label">
              <span class="text-base label-text text-black">Prénom</span>
            </label>
            <input
              type="text"
              placeholder="Prénom"
              v-model="firstName"
              class="w-full bg-transparent input input-bordered input-primary text-black"
              required
            />
          </div>
        </div>
        <div>
          <label class="label">
            <span class="text-base label-text text-black">Identifiant</span>
          </label>
          <input
            type="text"
            placeholder="Identifiant"
            v-model="username"
            class="w-full bg-transparent input input-bordered input-primary text-black"
            required
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
            required
          />
        </div>
        <div>
          <label class="label">
            <span class="text-base label-text text-black"
              >Confirmer le mot de passe</span
            >
          </label>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            v-model="confirmPassword"
            class="w-full bg-transparent input input-bordered input-primary text-black"
            required
          />
        </div>
        <div class="flex items-center">
          <button class="btn btn-primary mx-auto rounded-full">
            Je m'inscris
          </button>
        </div>
        <div>
          <p class="text-sm text-center text-gray-400">
            Déjà un compte ?
            <RouterLink
              to="/login"
              class="text-orange-600 hover:text-orange-800 hover:underline"
            >
              Connectez-vous
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
import { registerUser } from "../api/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");

const registration = async () => {
  errorMessage.value = "";
  const data = {
    username: username.value,
    name: lastName.value,
    firstname: firstName.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  try {
    await registerUser(data);
    router.push("/login");
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription. Veuillez réessayer.";
  }
};
</script>
