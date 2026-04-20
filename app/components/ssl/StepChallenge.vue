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
        Action_Required <span class="animate-blink inline-block w-2 bg-accent h-4 ml-2 align-bottom" />
      </h3>
      <div class="mt-2 text-sm text-text-dim font-mono">
        Add the following TXT record to your DNS provider. Global propagation may take a moment.
      </div>
    </div>

    <div class="bg-border p-px grid gap-px">
      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div class="relative z-10 w-full pr-4">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Record_Type</label>
          <p class="font-mono text-text-bright text-sm">
            TXT
          </p>
        </div>
      </div>

      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div class="relative z-10">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Hostname_(Name)</label>
          <p class="font-mono text-accent text-sm">
            {{ challengeData.challenge_domain }}
          </p>
        </div>
        <UTooltip text="Copy Hostname">
          <UButton
            variant="ghost"
            icon="i-heroicons-clipboard-document"
            color="neutral"
            class="relative z-10"
            @click="emit('copy', challengeData.challenge_domain)"
          />
        </UTooltip>
      </div>

      <div class="bg-bg-card p-4 flex justify-between items-center group relative overflow-hidden">
        <div class="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div class="relative z-10 w-full pr-4 overflow-hidden">
          <label class="text-[10px] text-text-dim uppercase font-bold tracking-widest mb-1 block">Value</label>
          <p class="font-mono text-text-bright text-sm truncate">
            {{ challengeData.txt_value }}
          </p>
        </div>
        <UTooltip text="Copy Value">
          <UButton
            variant="ghost"
            icon="i-heroicons-clipboard-document"
            color="neutral"
            class="relative z-10"
            @click="emit('copy', challengeData.txt_value)"
          />
        </UTooltip>
      </div>
    </div>

    <div class="flex space-x-4 mt-8">
      <UButton
        variant="ghost"
        color="neutral"
        class="flex-1 justify-center"
        :disabled="loading"
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
      <UButton
        color="primary"
        class="flex-1 justify-center"
        :loading="loading"
        @click="emit('verify')"
      >
        <template #loading>
          <span class="flex items-center justify-center text-bg opacity-80">
            [ Verifying<span class="animate-blink inline-block w-2 bg-bg h-4 ml-2 align-bottom" /> ]
          </span>
        </template>
        Verify & Issue
      </UButton>
    </div>
  </div>
</template>
