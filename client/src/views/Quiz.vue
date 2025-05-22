<template>
  <section class="max-w-4xl mx-auto pt-0 pl-6 pr-6 mb-4">
    <div class="mb-2">
      <h1 class="text-3xl font-bold text-[#0e5b8b]">{{ moduleName }}</h1>
    </div>
    <div class="mb-6">
      <div class="flex justify-between mb-1 text-sm font-medium text-[#0e5b8b]">
        <span>Question {{ currentIndex + 1 }} / {{ totalQuestions }}</span>
        <span>{{ progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
    <div v-if="currentQuestion" class="mb-8 p-6 bg-white shadow rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ currentQuestion.text }}
      </h3>
    </div>
    <div
      v-if="currentQuestion"
      class="flex flex-col sm:grid sm:grid-cols-2 gap-4 mb-4 text-gray-800"
    >
      <button
        v-for="response in currentQuestion.responses"
        :key="response.id"
        class="w-full p-4 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-start min-h-[56px]"
        @click="selectAnswer(response)"
        :class="{
          'bg-gray-600 text-white': selectedAnswer === response.id,
          'bg-gray-100 hover:bg-gray-200': selectedAnswer !== response.id,
        }"
      >
        {{ response.intitule }}
      </button>
    </div>
    <div class="flex justify-between mt-6">
      <button
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 cursor-pointer"
        @click="prevQuestion"
        :disabled="currentIndex === 0"
      >
        Précédent
      </button>
      <button
        v-if="currentIndex < totalQuestions - 1"
        class="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
        @click="nextQuestion"
      >
        Suivant
      </button>
      <button
        v-else
        class="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer"
        @click="sendQuiz"
      >
        Terminer le quiz
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "../stores/quizStore";
import { useQuizResultStore } from "../stores/resultQuizStore";
import { submitQuiz } from "../api/party";

const router = useRouter();
const quizStore = useQuizStore();
const quizResultStore = useQuizResultStore();
const questions = quizStore.questions;
const moduleName = quizStore.moduleName;

const currentIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});

const totalQuestions = computed(() => questions.length);
const currentQuestion = computed(() => questions[currentIndex.value]);

const progress = computed(() =>
  Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100)
);

watch(
  currentIndex,
  () => {
    const q = currentQuestion.value;
    if (!q) {
      selectedAnswer.value = null;
      return;
    }
    const saved = userAnswers.value[q.id];
    selectedAnswer.value = saved ?? null;
  },
  { immediate: true }
);

function selectAnswer(response) {
  const q = currentQuestion.value;
  if (!q) return;

  selectedAnswer.value = response.id;
  userAnswers.value[q.id] = response.id;
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++;
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function getUserAnswers() {
  return userAnswers.value;
}

const sendQuiz = async () => {
  const answers = getUserAnswers();
  try {
    const response = await submitQuiz(answers);
    quizResultStore.setResults(response.data.details);
    router.push(`/result/${moduleName}`);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  if (!questions || questions.length === 0) {
    router.push("/");
  }
});
</script>
