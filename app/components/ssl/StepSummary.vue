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
  'reset': []
  'copy': [text: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-emerald-400" />
        <h3 class="ml-3 text-sm font-medium text-emerald-300">Certificate Issued Successfully</h3>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Cert Block -->
      <div class="bg-neutral-800/40 border border-neutral-700 rounded-lg flex flex-col h-48">
        <div class="px-4 py-3 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 rounded-t-lg">
          <span class="text-sm font-medium text-neutral-300">Certificate (CRT)</span>
          <button @click="emit('copy', certData.cert)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
            <UIcon name="i-heroicons-clipboard" class="h-4 w-4 mr-1"/> Copy
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-xs text-emerald-500/80 whitespace-pre">
          {{ certData.cert }}
        </div>
      </div>

      <!-- Key Block -->
      <div class="bg-neutral-800/40 border border-neutral-700 rounded-lg flex flex-col h-48">
        <div class="px-4 py-3 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 rounded-t-lg">
          <span class="text-sm font-medium text-neutral-300">Private Key</span>
          <button @click="emit('copy', certData.key)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
            <UIcon name="i-heroicons-clipboard" class="h-4 w-4 mr-1"/> Copy
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-xs text-pink-500/80 whitespace-pre">
          {{ certData.key }}
        </div>
      </div>

      <!-- Full Chain Block -->
      <div class="bg-neutral-800/40 border border-neutral-700 rounded-lg flex flex-col h-48">
        <div class="px-4 py-3 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 rounded-t-lg">
          <span class="text-sm font-medium text-neutral-300">Full Chain (Nginx)</span>
          <button @click="emit('copy', certData.fullchain)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
            <UIcon name="i-heroicons-clipboard" class="h-4 w-4 mr-1"/> Copy
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-xs text-blue-500/80 whitespace-pre">
          {{ certData.fullchain }}
        </div>
      </div>
      
      <!-- CA Block -->
      <div class="bg-neutral-800/40 border border-neutral-700 rounded-lg flex flex-col h-48">
        <div class="px-4 py-3 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 rounded-t-lg">
          <span class="text-sm font-medium text-neutral-300">Intermediate CA</span>
          <button @click="emit('copy', certData.ca)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
            <UIcon name="i-heroicons-clipboard" class="h-4 w-4 mr-1"/> Copy
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 font-mono text-xs text-neutral-500/80 whitespace-pre">
          {{ certData.ca }}
        </div>
      </div>
    </div>

    <div class="pt-4 text-center">
      <button @click="emit('reset')" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
        Issue Another Certificate
      </button>
    </div>
  </div>
</template>
