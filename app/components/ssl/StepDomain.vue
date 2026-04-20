<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  loading: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': []
}>()

const localDomain = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <label for="domain" class="block text-xs uppercase tracking-wider font-mono text-text-dim mb-2"><span class="text-accent">]</span> Target Domain</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UIcon name="i-heroicons-globe-alt" class="text-text-dim h-5 w-5" />
        </div>
        <input
          id="domain"
          v-model="localDomain"
          type="text"
          name="domain"
          class="block w-full pl-10 border border-border bg-bg-card text-text-bright rounded-none py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-mono text-sm placeholder:text-text-dim/50"
          placeholder="sub.example.com"
          :disabled="loading"
          @keyup.enter="emit('submit')"
        >
      </div>
    </div>
    <button
      :disabled="loading || !localDomain"
      class="w-full flex justify-center py-3 px-4 rounded-[2px] text-sm font-bold font-display tracking-wide text-bg bg-accent hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
      @click="emit('submit')"
    >
      <span v-if="!loading">Initialize Challenge</span>
      <span v-else class="flex items-center text-bg opacity-80">
        [ Processing<span class="animate-blink inline-block w-2 bg-bg h-4 ml-2 align-bottom"></span> ]
      </span>
    </button>
  </div>
</template>
