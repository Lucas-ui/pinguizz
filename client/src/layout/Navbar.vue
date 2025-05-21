<template>
  <div class="navbar mx-auto max-w-7xl bg-transparent z-10">
    <div class="navbar-start">
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
    <div class="navbar-end relative">
      <RouterLink
        to="/login"
        class="btn btn-primary rounded-full"
        v-if="!isAuthenticated"
      >
        Se connecter
      </RouterLink>
      <div v-if="isAuthenticated" class="relative">
        <img
          v-if="user && user.image"
          class="w-12 h-12 rounded-full object-cover cursor-pointer shadow-md"
          :src="`${apiUrl}/images/avatar/${user.image}`"
          alt="Image de profil"
          @click="toggleMenu"
        />
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-20"
        >
          <ul class="flex flex-col py-2">
            <li>
              <RouterLink
                to="/profile"
                class="px-4 py-2 hover:bg-gray-100 text-sm text-gray-800 block"
                @click="hideModalOnClick"
              >
                Profil
              </RouterLink>
            </li>
            <li>
              <button
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                @click="logOutAndClose"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
import { useAuthStore } from "../stores/authStore";
import { infosUser } from "../api/auth";
import "remixicon/fonts/remixicon.css";

const router = useRouter();

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};

const hideModalOnClick = () => {
  closeMenu();
};

const logOut = () => {
  authStore.logout();
  authStore.checkAuth();
  router.push("/");
};

const logOutAndClose = () => {
  closeMenu();
  logOut();
};
</script>

<style scoped>
.active-link p {
  color: #2563eb;
}
.active-link p::after {
  width: 100% !important;
}
</style>
