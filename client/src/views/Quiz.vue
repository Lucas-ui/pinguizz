<template>
  <section class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-blue-700">Thème : Histoire</h1>
      <h2 class="text-xl text-gray-700">Module : Révolution Française</h2>
    </div>

    <div class="mb-6">
      <div class="flex justify-between mb-1 text-sm font-medium text-blue-700">
        <span>Question 1 / 15</span>
        <span>0%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          :style="{ width: '0%' }"
        ></div>
      </div>
    </div>

    <div class="mb-8 p-6 bg-white shadow rounded-lg">
      <h3 class="text-lg font-semibold text-gray-800">
        Quelle est la capitale de Paris ?
      </h3>
    </div>

    <div class="space-y-4 text-gray-800 mb-4">
      <button
        class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        Paris
      </button>
      <button
        class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        Londres
      </button>
      <button
        class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        Berlin
      </button>
      <button
        class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        Madrid
      </button>
    </div>
    <div class="flex justify-between">
      <button
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Précédent
      </button>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  </section>
</template>

<script setup></script>
