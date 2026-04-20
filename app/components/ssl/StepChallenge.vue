<script setup lang="ts">
defineProps<{
  challengeData: {
    challenge_domain: string
    txt_value: string
  }
  loading: boolean
}>()

const emit = defineEmits<{
  verify: []
  cancel: []
  copy: [text: string]
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="relative pl-4 border-l-2 border-accent mb-8">
      <h3 class="text-sm font-bold font-display tracking-widest uppercase text-text-bright flex items-center">
        Action_Required <span class="animate-blink inline-block w-2 bg-accent h-4 ml-2 align-bottom"></span>
      </h3>
      <div class="mt-2 text-sm text-text-dim font-mono">
        Add the following TXT record to your DNS provider. Global propagation may take a moment.
      </div>
    </div>

    <div class="bg-border p-[1px] grid gap-[1px]">
      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <div class="relative z-10 w-full pr-4">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Record_Type</label>
          <p class="font-mono text-text-bright text-sm">TXT</p>
        </div>
      </div>

      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <div class="relative z-10">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Hostname_(Name)</label>
          <p class="font-mono text-accent text-sm">
            {{ challengeData.challenge_domain }}
          </p>
        </div>
        <button class="relative z-10 text-text-dim hover:text-accent transition-colors" title="Copy Hostname" @click="emit('copy', challengeData.challenge_domain)">
          <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
        </button>
      </div>

      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <div class="relative z-10 w-full pr-4 overflow-hidden">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Value</label>
          <p class="font-mono text-text-bright text-sm truncate">
            {{ challengeData.txt_value }}
          </p>
        </div>
        <button class="relative z-10 text-text-dim hover:text-accent transition-colors flex-shrink-0" title="Copy Value" @click="emit('copy', challengeData.txt_value)">
          <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="flex space-x-4 mt-8">
      <button :disabled="loading" class="flex-1 py-3 px-4 border border-border text-text-dim hover:text-text-bright hover:border-text-bright transition-colors disabled:opacity-50 text-sm font-bold font-display tracking-widest uppercase rounded-none" @click="emit('cancel')">
        Cancel
      </button>
      <button
        :disabled="loading" class="flex-1 py-3 px-4 rounded-[2px] text-sm font-bold font-display tracking-wide text-bg bg-accent hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        @click="emit('verify')"
      >
        <span v-if="!loading">Verify & Issue</span>
        <span v-else class="flex items-center justify-center text-bg opacity-80">
          [ Verifying<span class="animate-blink inline-block w-2 bg-bg h-4 ml-2 align-bottom"></span> ]
        </span>
      </button>
    </div>
  </div>
</template>
