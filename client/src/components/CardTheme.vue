<template>
  <div class="flex flex-wrap gap-6 justify-center">
    <div
      v-for="theme in themes"
      :key="theme.id"
      class="card bg-base-100 bg-transparent w-96"
    >
      <figure class="px-10 pt-10">
        <img
          class="rounded-xl object-cover h-40 w-full"
          :src="`${apiUrl}/images/theme/${theme.image}`"
          alt="Image de profil"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-black">{{ theme.name }}</h2>
        <p class="text-black">
          {{ theme.description }}
        </p>
        <div class="card-actions">
          <RouterLink :to="`/module/${theme.name}`">
            <button
              class="btn bg-[#f35e21] hover:bg-[#e55215] border-0 rounded-full"
            >
              Découvrir les modules
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { allThemes } from "../api/theme";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";

const themes = ref([]);

const fetchThemes = async () => {
  try {
    const response = await allThemes();
    themes.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchThemes();
});
</script>
