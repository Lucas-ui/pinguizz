<template>
  <img :src="Logo" :style="{ width, height }" alt="Logo principal" />
</template>

<script setup>
import Logo from "../assets/images/pinguizz_logo.png";

defineProps({
  width: {
    type: String,
  },
  height: {
    type: String,
  },
});
</script>
