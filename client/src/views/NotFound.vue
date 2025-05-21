<template>
  <main class="grid min-h-full place-items-center px-6 lg:px-8 mb-20">
    <div class="text-center">
      <h1
        class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
      >
        Page introuvable
      </h1>
      <p
        class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
      >
        Désolé, nous n'avons pas trouvé la page que vous recherchez.
      </p>
      <img
        class="h-80 w-80 rounded-full object-cover mx-auto"
        src="../assets/images/error.png"
        alt="Image d'erreur"
      />
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink
          to="/"
          class="btn bg-[#f35e21] hover:bg-[#e55215] border-0 rounded-full"
          >Retour à l'accueil</RouterLink
        >
        <RouterLink to="/" class="text-sm font-semibold text-gray-900"
          >Contactez le support
          <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </div>
    </div>
  </main>
</template>
