import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuizStore = defineStore("quiz", () => {
  const questions = ref([]);
  const moduleName = ref("");

  function setQuizData(questionsData, moduleNameValue) {
    questions.value = questionsData;
    moduleName.value = moduleNameValue;
  }

  function resetQuiz() {
    questions.value = [];
    moduleName.value = "";
  }

  return {
    questions,
    moduleName,
    setQuizData,
    resetQuiz,
  };
});
