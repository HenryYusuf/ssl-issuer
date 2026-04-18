<script setup lang="ts">
defineProps<{
  challengeData: {
    challenge_domain: string
    txt_value: string
  }
  loading: boolean
}>()

const emit = defineEmits<{
  'verify': []
  'cancel': []
  'copy': [text: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
      <div class="flex items-start">
        <UIcon name="i-heroicons-information-circle" class="h-6 w-6 text-blue-400 mt-0.5" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-300">Action Required</h3>
          <div class="mt-2 text-sm text-blue-200/80">
            Please add the following TXT record to your DNS provider. It may take some time for DNS to propagate.
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700/50">
        <label class="text-xs text-neutral-400 uppercase font-semibold">Record Type</label>
        <p class="font-mono text-white mt-1">TXT</p>
      </div>
      
      <div class="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700/50 flex justify-between items-center group">
        <div>
          <label class="text-xs text-neutral-400 uppercase font-semibold">Hostname (Name)</label>
          <p class="font-mono text-emerald-400 mt-1">{{ challengeData.challenge_domain }}</p>
        </div>
        <button @click="emit('copy', challengeData.challenge_domain)" class="text-neutral-500 group-hover:text-white transition-colors" title="Copy Hostname">
          <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
        </button>
      </div>

      <div class="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700/50 flex justify-between items-center group">
        <div class="w-full pr-4 overflow-hidden">
          <label class="text-xs text-neutral-400 uppercase font-semibold">Value</label>
          <p class="font-mono text-white mt-1 truncate">{{ challengeData.txt_value }}</p>
        </div>
        <button @click="emit('copy', challengeData.txt_value)" class="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0" title="Copy Value">
          <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="flex space-x-4">
      <button @click="emit('cancel')" :disabled="loading" class="flex-1 py-3 px-4 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium">
        Cancel
      </button>
      <button @click="emit('verify')" :disabled="loading"
              class="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none transition-all disabled:opacity-50">
        <span v-if="!loading">Verify & Issue</span>
        <span v-else class="flex items-center justify-center">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin -ml-1 mr-2 h-5 w-5" /> Verifying...
        </span>
      </button>
    </div>
  </div>
</template>
