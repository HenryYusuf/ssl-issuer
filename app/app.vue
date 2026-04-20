<script setup>
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap' }
  ],
  bodyAttrs: {
    class: 'm-0 p-0 overflow-x-hidden font-mono bg-bg text-text-dim selection:bg-accent/30',
  },
})
</script>

<template>
  <UApp>
    <div class="min-h-screen noise-overlay overflow-hidden">
      <!-- Glow effect backing -->
      <div class="fixed inset-0 pointer-events-none flex justify-center items-center z-[-1]">
        <div class="w-[800px] h-[800px] rounded-full bg-accent opacity-[0.03] blur-[150px]" />
      </div>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
