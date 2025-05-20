<template>
  <footer class="footer sm:footer-horizontal bg-transparent text-black p-10">
    <aside>
      <div class="flex items-center">
        <Logo width="70px" height="auto" />
        <p
          class="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent"
        >
          Pinguiz
        </p>
      </div>
      <span class="text-sm text-gray-500 max-w-xs">
        La façon ludique et interactive de tester vos connaissances et
        d'apprendre de nouvelles compétences.
      </span>
    </aside>
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </nav>
  </footer>
  <div class="border-t border-gray-200 text-center text-sm text-gray-500 py-10">
    © 2025 Pinguiz. Tous droits réservés.
  </div>
</template>

<script setup>
import Logo from "../components/Logo.vue";
</script>
