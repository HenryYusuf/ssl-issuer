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
    <UFormField label="Target Domain" :ui="{ label: 'text-xs uppercase tracking-wider font-mono text-text-dim mb-2' }">
      <template #label="{ label }">
        <span class="text-accent">]</span> {{ label }}
      </template>
      
      <UInput
        v-model="localDomain"
        type="text"
        placeholder="sub.example.com"
        size="md"
        icon="i-heroicons-globe-alt"
        :disabled="loading"
        class="w-full"
        @keyup.enter="emit('submit')"
      />
    </UFormField>

    <UButton
      block
      :loading="loading"
      :disabled="!localDomain"
      color="primary"
      @click="emit('submit')"
    >
      <template #loading>
        <span class="flex items-center text-bg opacity-80">
          [ Processing<span class="animate-blink inline-block w-2 bg-bg h-4 ml-2 align-bottom"></span> ]
        </span>
      </template>
      Initialize Challenge
    </UButton>
  </div>
</template>

