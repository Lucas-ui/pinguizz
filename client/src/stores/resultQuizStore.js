import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuizResultStore = defineStore("quizResult", () => {
  const results = ref([]);

  function setResults(data) {
    results.value = data;
  }

  return { results, setResults };
});
