<template>
  <div
    class="relative flex flex-col justify-center overflow-hidden min-h-screen mt-[-60px]"
  >
    <div class="w-full p-6 m-auto rounded-md lg:max-w-lg">
      <Logo class="mx-auto" width="130px" height="auto" />
      <h1 class="text-3xl font-semibold text-center text-black">Pinguiz</h1>
      <form class="space-y-4">
        <div>
          <label class="label">
            <span class="text-base label-text text-black"
              >Nom d'utilisateur</span
            >
          </label>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
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
            class="w-full bg-transparent input input-bordered input-primary text-black"
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
            class="w-full bg-transparent input input-bordered input-primary text-black"
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
              >Connectez-vous</RouterLink
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Logo from "../components/Logo.vue";
</script>
