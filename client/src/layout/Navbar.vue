<template>
  <div class="navbar mx-auto max-w-7xl bg-transparent z-10">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a class="text-black">Démarrer un quiz</a></li>
          <li>
            <RouterLink to="/themes" class="text-black">Thèmes</RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex items-center rotate-[-4deg]">
        <RouterLink to="/">
          <Logo width="70px" height="auto" />
        </RouterLink>
        <RouterLink
          to="/"
          class="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent"
          >Pinguiz</RouterLink
        >
      </div>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="flex gap-3 px-1">
        <li>
          <RouterLink
            to="/"
            exact-active-class="active-link"
            class="text-black uppercase font-bold tracking-tighter"
          >
            <p
              class="text-base text-gray-700 font-medium transition-all duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
            >
              Accueil
            </p>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/themes"
            exact-active-class="active-link"
            class="text-black uppercase font-bold tracking-tighter"
          >
            <p
              class="text-base text-gray-700 font-medium transition-all duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
            >
              Thèmes
            </p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink to="/login" class="btn btn-primary rounded-full"
        >Se connecter</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
</script>

<style scoped>
.active-link p {
  color: #2563eb;
}
.active-link p::after {
  width: 100% !important;
}
</style>
