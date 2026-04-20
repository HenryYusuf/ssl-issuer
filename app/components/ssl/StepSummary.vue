<script setup lang="ts">
defineProps<{
  certData: {
    cert: string
    key: string
    ca: string
    fullchain: string
  }
}>()

const emit = defineEmits<{
  reset: []
  copy: [text: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="relative pl-4 border-l-2 border-accent mb-8">
      <h3 class="text-sm font-bold font-display tracking-widest uppercase text-text-bright flex items-center">
        Certificate_Issued <span class="animate-blink inline-block w-2 bg-accent h-4 ml-2 align-bottom" />
      </h3>
      <div class="mt-2 text-sm text-text-dim font-mono">
        Your DNS-01 SSL certificate has been generated and signed successfully.
      </div>
    </div>

    <!-- The Thin Grid for Keys -->
    <div class="bg-border p-[1.5px] grid grid-cols-1 md:grid-cols-2 gap-[1.5px]">
      <!-- Cert Block -->
      <div class="bg-bg flex flex-col h-48 relative overflow-hidden group">
        <div class="px-4 py-2 border-b border-border flex justify-between items-center bg-bg-raised">
          <span class="text-[10px] font-bold font-display uppercase tracking-widest text-text-dim group-hover:text-text-bright transition-colors">Certificate (CRT)</span>
          <UTooltip text="Copy CRT">
            <UButton variant="ghost" color="neutral" icon="i-heroicons-clipboard" size="xs" @click="emit('copy', certData.cert)" />
          </UTooltip>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-[11px] text-text-bright/70 whitespace-pre selection:bg-accent/30 custom-scrollbar">
          {{ certData.cert }}
        </div>
      </div>

      <!-- Key Block -->
      <div class="bg-bg flex flex-col h-48 relative overflow-hidden group">
        <div class="px-4 py-2 border-b border-border flex justify-between items-center bg-bg-raised">
          <span class="text-[10px] font-bold font-display uppercase tracking-widest text-text-dim group-hover:text-text-bright transition-colors">Private Key</span>
          <UTooltip text="Copy Private Key">
            <UButton variant="ghost" color="neutral" icon="i-heroicons-clipboard" size="xs" @click="emit('copy', certData.key)" />
          </UTooltip>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-[11px] text-text-bright/70 whitespace-pre selection:bg-accent/30 custom-scrollbar">
          {{ certData.key }}
        </div>
      </div>

      <!-- Full Chain Block -->
      <div class="bg-bg flex flex-col h-48 relative overflow-hidden group">
        <div class="px-4 py-2 border-b border-border flex justify-between items-center bg-bg-raised">
          <span class="text-[10px] font-bold font-display uppercase tracking-widest text-text-dim group-hover:text-text-bright transition-colors">Full Chain (Nginx)</span>
          <UTooltip text="Copy Full Chain">
            <UButton variant="ghost" color="neutral" icon="i-heroicons-clipboard" size="xs" @click="emit('copy', certData.fullchain)" />
          </UTooltip>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-[11px] text-text-bright/70 whitespace-pre selection:bg-accent/30 custom-scrollbar">
          {{ certData.fullchain }}
        </div>
      </div>

      <!-- CA Block -->
      <div class="bg-bg flex flex-col h-48 relative overflow-hidden group">
        <div class="px-4 py-2 border-b border-border flex justify-between items-center bg-bg-raised">
          <span class="text-[10px] font-bold font-display uppercase tracking-widest text-text-dim group-hover:text-text-bright transition-colors">Intermediate CA</span>
          <UTooltip text="Copy CA">
            <UButton variant="ghost" color="neutral" icon="i-heroicons-clipboard" size="xs" @click="emit('copy', certData.ca)" />
          </UTooltip>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-[11px] text-text-bright/70 whitespace-pre selection:bg-accent/30 custom-scrollbar">
          {{ certData.ca }}
        </div>
      </div>
    </div>

    <div class="pt-6 text-center">
      <UButton
        variant="link"
        color="none"
        class="font-display uppercase tracking-widest text-xs"
        @click="emit('reset')"
      >
        <template #leading>
          <span class="text-accent underline-none">_</span>
        </template>
        Issue Another Certificate
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--bg);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--border);
  border-radius: 0px;
}
</style>
