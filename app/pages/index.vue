<script setup lang="ts">
const {
  step,
  loading,
  domain,
  challengeData,
  certData,
  requestIssue,
  verifyChallenge,
  copyToClipboard,
  reset,
} = useSslIssuer()
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center p-6 sm:p-12">
    <div class="w-full max-w-2xl animate-slide-up mt-12">
      <!-- Main Glass Card - Now using UCard -->
      <UCard
        :ui="{
          root: 'bg-card/80 backdrop-blur-[20px] rounded-none md:rounded-sm overflow-visible',
          body: 'p-8 sm:p-10',
        }"
      >
        <div class="mb-10 text-left">
          <h1 class="text-4xl sm:text-5xl font-extrabold font-display text-text-bright tracking-tight mb-2">
            SSL<span class="text-accent" style="text-shadow: 0 0 40px var(--accent);">_</span>ISSUER
          </h1>
          <p class="text-sm font-mono text-text-dim">
            Local DNS challenge manager. <span class="animate-blink inline-block w-2 bg-text-bright h-4 ml-1 align-bottom" />
          </p>
        </div>

        <!-- Wizard Progress - The "Thin Grid" -->
        <div class="flex items-center space-x-0 mb-10 bg-border p-[1.5px] gap-[1.5px] font-mono text-[10px] tracking-widest uppercase text-left">
          <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step >= 1 ? 'bg-main text-text-bright border-b border-accent' : 'bg-raised text-text-dim border-b border-transparent']">
            01/ Domain
          </div>
          <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step >= 2 ? 'bg-main text-text-bright border-b border-accent' : 'bg-raised text-text-dim border-b border-transparent']">
            02/ Challenge
          </div>
          <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step === 3 ? 'bg-main text-text-bright border-b border-accent' : 'bg-raised text-text-dim border-b border-transparent']">
            03/ Export
          </div>
        </div>

        <!-- Steps with Transition -->
        <Transition name="fade" mode="out-in">
          <div :key="step" class="text-left">
            <SslStepDomain
              v-if="step === 1"
              v-model="domain"
              :loading="loading"
              @submit="requestIssue"
            />

            <SslStepChallenge
              v-else-if="step === 2"
              :challenge-data="challengeData"
              :loading="loading"
              @verify="verifyChallenge"
              @cancel="step = 1"
              @copy="copyToClipboard"
            />

            <SslStepSummary
              v-else-if="step === 3"
              :cert-data="certData"
              @reset="reset"
              @copy="copyToClipboard"
            />
          </div>
        </Transition>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
