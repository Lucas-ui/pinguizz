<template>
  <footer class="footer sm:footer-horizontal bg-transparent text-black p-6">
    <aside class="flex items-center justify-between w-full">
      <div class="flex items-center">
        <Logo width="70px" height="auto" />
        <p
          class="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent"
        >
          Pinguiz
        </p>
      </div>
      <div class="flex flex-col sm:items-center sm:flex-row gap-4">
        <RouterLink to="/terms"
          ><p class="hover:underline">Conditions d'utilisation</p></RouterLink
        >
        <RouterLink to="/rules">
          <p class="hover:underline">Règlement</p>
        </RouterLink>
        <a href="https://github.com/Lucas-ui/pinguizz" target="_blank">
          <i class="ri-github-fill text-3xl text-black"></i>
        </a>
      </div>
    </aside>
  </footer>
  <div class="border-t border-gray-200 text-center text-sm text-gray-500 py-6">
    © 2025 Pinguiz. Tous droits réservés.
  </div>
</template>

<script setup>
import Logo from "../components/Logo.vue";
</script>
