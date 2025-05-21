<template>
  <footer class="footer sm:footer-horizontal bg-transparent text-black p-10">
    <aside class="flex items-center justify-between w-full">
      <div class="flex items-center">
        <Logo width="70px" height="auto" />
        <p
          class="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent"
        >
          Pinguiz
        </p>
      </div>
      <div class="flex gap-4">
        <p>Conditions d'utilisation</p>
        <p>Règlement</p>
        <p>Contact</p>
      </div>
    </aside>
  </footer>
  <div class="border-t border-gray-200 text-center text-sm text-gray-500 py-10">
    © 2025 Pinguiz. Tous droits réservés.
  </div>
</template>

<script setup>
import Logo from "../components/Logo.vue";
</script>
