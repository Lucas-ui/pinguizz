<template>
  <main>
    <section
      class="text-black flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto"
    >
      <div class="left-part flex-1 flex flex-col justify-center">
        <p
          class="text-5xl text-center sm:text-left sm:text-7xl font-bold mb-4 text-[#0e5b8b]"
        >
          Bienvenue sur <span class="text-[#f35e21]">Pinguiz !</span>
        </p>
        <p class="mb-8 text-lg text-gray-600">
          La plateforme ludique et interactive pour tester vos connaissances et
          apprendre de nouvelles compétences. Rejoignez notre communauté
          d'apprenants dès aujourd'hui !
        </p>
        <RouterLink to="/themes">
          <button class="btn btn-primary rounded-full text-white w-fit">
            Choisir un thème
          </button>
        </RouterLink>
      </div>
      <div class="right-part flex-1 flex justify-center items-center relative">
        <img :src="HeroImage" alt="Hero Image" class="w-84 h-auto max-w-full" />
      </div>
    </section>
    <section class="py-6 sm:py-20 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="mb-4 text-3xl font-bold text-[#0e5b8b] md:text-4xl p-4">
          Et si le quiz devenait une aventure ?
        </p>
        <p class="mx-auto max-w-2xl text-gray-600">
          Notre plateforme offre une expérience d'apprentissage unique avec des
          quiz interactifs et des retours détaillés.
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-3 p-6">
        <div
          class="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
        >
          <div
            class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-50 opacity-50 group-hover:bg-blue-100 transition-colors duration-300"
          ></div>
          <div
            class="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-7 w-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              ></path>
            </svg>
          </div>
          <h3
            class="mb-3 text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
          >
            Apprenez à votre rythme
          </h3>
          <p class="text-gray-600">
            Faites des quiz quand vous le souhaitez, autant de fois que
            nécessaire pour maîtriser le sujet.
          </p>
        </div>
        <div
          class="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
        >
          <div
            class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-50 opacity-50 group-hover:bg-green-100 transition-colors duration-300"
          ></div>
          <div
            class="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-7 w-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
              ></path>
            </svg>
          </div>
          <h3
            class="mb-3 text-xl font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
          >
            Sujets variés
          </h3>
          <p class="text-gray-600">
            De l'informatique à la culture générale, nous couvrons un large
            éventail de sujets passionnants.
          </p>
        </div>
        <div
          class="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
        >
          <div
            class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-50 opacity-50 group-hover:bg-purple-100 transition-colors duration-300"
          ></div>
          <div
            class="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-7 w-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              ></path>
            </svg>
          </div>
          <h3
            class="mb-3 text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
          >
            Suivez vos progrès
          </h3>
          <p class="text-gray-600">
            Surveillez vos performances au fil du temps et constatez vos progrès
            grâce à des statistiques détaillées.
          </p>
        </div>
      </div>
    </section>
    <section class="py-12 sm:py-20">
      <div class="text-center mb-16">
        <p class="mb-4 text-3xl font-bold text-[#0e5b8b] md:text-4xl p-4">
          Voici quelques-uns de nos thèmes de quiz
        </p>
        <p class="mx-auto max-w-2xl text-gray-600">
          Chaque thème contient des modules plus précis pour mettre à l'épreuve
          vos connaissances dans différents domaines. Explorez nos catégories et
          trouvez le sujet qui vous passionne !
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <CardTheme />
        <CardTheme />
        <CardTheme />
      </div>
    </section>
    <section
      class="py-20 bg-[#0e5b8b] text-white h-[400px] flex items-center relative"
    >
      <div class="absolute w-full h-full top-0 left-0 opacity-10">
        <svg
          class="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <div class="container relative px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Prêt à tester vos connaissances ?
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          Rejoignez des milliers d'étudiants qui améliorent déjà leurs
          compétences avec Pinguiz. Commencez votre parcours d'apprentissage dès
          aujourd'hui !
        </p>
        <div class="flex gap-4 justify-center">
          <RouterLink to="/registration">
            <button
              class="btn bg-[#f35e21] border-0 rounded-full text-white w-fit"
            >
              S'inscrire maintenant
            </button>
          </RouterLink>
          <RouterLink to="/themes">
            <button
              class="btn bg-transparent border-1 border-white rounded-full text-white w-fit"
            >
              Explorer les thèmes
            </button>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import HeroImage from "../assets/images/hero-image.png";
import CardTheme from "../components/CardTheme.vue";
</script>
