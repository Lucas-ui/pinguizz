<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-10 text-center">
      <h1 class="mb-4 text-4xl text-[#0e5b8b] font-bold md:text-5xl">
        Modules de {{ themeName }}
      </h1>
      <p class="mx-auto mb-8 max-w-2xl text-gray-600">
        Choisis un module pour commencer à explorer les quiz.
      </p>
    </div>
    <div class="flex flex-wrap gap-6 justify-center">
      <div
        v-for="module in modules"
        :key="module.id"
        class="card bg-base-100 bg-transparent w-96"
      >
        <figure class="px-10 pt-10">
          <img
            class="rounded-xl object-cover h-40 w-full"
            :src="`${apiUrl}/images/module/${module.image}`"
            alt="Image de profil"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title text-black">{{ module.name }}</h2>
          <p class="text-black">
            {{ module.description }}
          </p>
          <button
            class="btn bg-[#f35e21] hover:bg-[#e55215] border-0 rounded-full"
            @click="startQuiz(module.name)"
          >
            Démarrer le quiz
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { allModulesByThemes } from "../api/module";
import { useRoute, useRouter } from "vue-router";
import { generateQuiz } from "../api/party";
import { useQuizStore } from "../stores/quizStore";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";
const route = useRoute();
const router = useRouter();
const quizStore = useQuizStore();
const themeName = route.params.name;

const modules = ref([]);

const startQuiz = async (moduleName) => {
  try {
    const response = await generateQuiz(moduleName);
    quizStore.setQuizData(response.data.questions, moduleName);
    router.push(`/quiz/${moduleName}`);
  } catch (error) {
    console.error(error);
  }
};

const getModulesByThemes = async () => {
  try {
    const response = await allModulesByThemes(themeName);
    modules.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getModulesByThemes();
});
</script>
