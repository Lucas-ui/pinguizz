<template>
  <section class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl text-center font-bold text-black mb-4">
      Résultat du quiz
    </h1>
    <h3 class="text-3xl font-bold text-[#0e5b8b] mb-6">{{ moduleName }}</h3>
    <div class="mb-8 flex justify-between items-center">
      <p class="text-xl font-semibold text-black">
        Score : {{ score }} / {{ totalQuestions }}
      </p>
      <RouterLink to="/">
        <button
          class="btn bg-[#f35e21] hover:bg-[#e55215] text-white border-0 rounded-full"
        >
          Revenir à l'accueil
        </button>
      </RouterLink>
    </div>
    <div v-if="results.length === 0" class="text-center text-gray-500">
      Aucun résultat à afficher.
    </div>
    <div v-else class="space-y-6 text-black">
      <div
        v-for="(result, index) in results"
        :key="result.questionId"
        class="p-4 rounded-lg shadow"
      >
        <h3 class="font-semibold text-lg mb-2">
          {{ index + 1 }}. {{ result.questionText }}
        </h3>
        <div class="grid sm:grid-cols-2 gap-3 mb-2">
          <div
            v-for="response in result.responses"
            :key="response.responseId"
            class="p-3 rounded-md border"
            :class="getResponseClass(response)"
          >
            {{ response.text }}
            <span
              v-if="response.isCorrect"
              class="ml-2 text-sm text-green-600 font-semibold"
            >
              (Réponse correcte)
            </span>
            <span
              v-else-if="response.isSelected"
              class="ml-2 text-sm text-red-600 font-semibold"
            >
              (Votre réponse)
            </span>
          </div>
        </div>
        <p class="text-sm">
          <span
            :class="
              result.isCorrect
                ? 'text-green-700 font-bold'
                : 'text-red-700 font-bold'
            "
          >
            {{ result.isCorrect ? "Correct" : "Incorrect" }}
          </span>
        </p>
      </div>
      <div class="text-center pt-6">
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

const score = computed(() => results.filter((r) => r.isCorrect).length);

const totalQuestions = results.length;

function getResponseClass(response) {
  if (response.isCorrect) {
    return "bg-green-100 border-green-300 text-green-800";
  }
  if (response.isSelected && !response.isCorrect) {
    return "bg-red-100 border-red-300 text-red-800";
  }
  return "bg-gray-50 border-gray-200 text-gray-700";
}
</script>
