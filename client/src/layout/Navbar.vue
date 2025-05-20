<template>
  <div class="navbar bg-base-100">
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
      <RouterLink to="/">
        <Logo width="60px" height="auto" />
      </RouterLink>
      <RouterLink to="/" class="text-xl text-black">Pinguiz</RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a class="text-black">Démarrer un quiz</a></li>
        <li><RouterLink to="/themes" class="text-black">Thèmes</RouterLink></li>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink to="/login" class="btn text-black">Se connecter</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
</script>
