<template>
  <section class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-[#0e5b8b] mb-6">
      Résultats du quiz : {{ moduleName }}
    </h1>
    <div class="mb-6 flex justify-between items-center">
      <p class="text-xl text-black font-semibold">
        Score : {{ score }} / {{ totalQuestions }}
      </p>
      <RouterLink to="/">
        <button
          class="btn bg-[#f35e21] hover:bg-[#e55215] border-0 rounded-full"
        >
          Revenir à l'accueil
        </button>
      </RouterLink>
    </div>
    <div v-if="results.length === 0" class="text-gray-500">
      Aucun résultat à afficher.
    </div>
    <div v-else class="space-y-4 text-black">
      <div
        v-for="(result, index) in results"
        :key="result.questionId"
        class="p-4 rounded-lg shadow"
        :class="result.isCorrect ? 'bg-green-100' : 'bg-red-100'"
      >
        <h3 class="font-semibold text-lg mb-1">Question {{ index + 1 }}</h3>
        <p>
          Réponse choisie : <strong>{{ result.selectedResponseId }}</strong>
        </p>
        <p>
          <span
            :class="
              result.isCorrect ? 'text-green-700' : 'text-red-700 font-bold'
            "
          >
            {{ result.isCorrect ? "Correct" : "Incorrect" }}
          </span>
        </p>
      </div>
      <div class="text-center">
        <RouterLink to="/">
          <button class="btn btn-primary rounded-full">
            Revenir à l'accueil
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuizResultStore } from "../stores/resultQuizStore";

const route = useRoute();
const quizResultStore = useQuizResultStore();

const moduleName = route.params.name;

const results = quizResultStore.results || [];

const score = computed(() => {
  return results.filter((r) => r.isCorrect).length;
});

const totalQuestions = results.length;
</script>
