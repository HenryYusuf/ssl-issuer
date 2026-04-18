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
      <label for="domain" class="block text-sm font-medium text-neutral-300">Target Domain</label>
      <div class="mt-2 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UIcon name="i-heroicons-globe-alt" class="text-neutral-500 h-5 w-5" />
        </div>
        <input
          id="domain"
          v-model="localDomain"
          type="text"
          name="domain"
          class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-neutral-700 bg-neutral-800/50 text-white rounded-lg py-3 transition-colors"
          placeholder="sub.example.com"
          :disabled="loading"
          @keyup.enter="emit('submit')"
        >
      </div>
    </div>
    <button
      :disabled="loading || !localDomain"
      class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      @click="emit('submit')"
    >
      <span v-if="!loading">Initialize Challenge</span>
      <span v-else class="flex items-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin -ml-1 mr-2 h-5 w-5" /> Processing...
      </span>
    </button>
  </div>
</template>
