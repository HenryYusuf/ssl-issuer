<script setup>
useHead({
  bodyAttrs: {
    class: 'bg-neutral-950 m-0 p-0 overflow-x-hidden',
  },
})
</script>

<template>
  <UApp>
    <div class="h-screen bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30 font-sans debug-screens transition-colors overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950 to-neutral-950 z-[-1]" />
      <div class="absolute inset-0 bg-neutral-950 [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
