<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const particles = ref<Particle[]>([]);
let animationId: number;

const resizeCanvas = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
};

const createParticles = () => {
  particles.value = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);

  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: Math.random() > 0.5 ? "#3B82F6" : "#F97316",
      opacity: Math.random() * 0.5 + 0.1,
    });
  }
};

const animate = () => {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.value.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle =
      p.color +
      Math.floor(p.opacity * 255)
        .toString(16)
        .padStart(2, "0");
    ctx.fill();
  });

  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  resizeCanvas();
  createParticles();
  window.addEventListener("resize", resizeCanvas);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
  cancelAnimationFrame(animationId);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 -z-10 opacity-30 pointer-events-none"
  ></canvas>
</template>
