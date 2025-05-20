<template>
  <div
    class="mx-auto mb-8 flex max-w-md items-center rounded-full border border-gray-300 px-4 py-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-search mr-2 h-5 w-5 text-gray-400"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
    <input
      type="text"
      placeholder="Rechercher un thème..."
      value=""
      class="flex h-10 w-full text-black rounded-md px-3 py-2 text-base placeholder:text-muted-foreground shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    />
  </div>
</template>

<script setup></script>
