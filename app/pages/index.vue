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
  <div class="min-h-screen flex text-center flex-col items-center justify-center p-6 sm:p-12 bg-transparent text-text-dim">
    <div class="w-full max-w-2xl text-left animate-slide-up">
      <!-- Main Glass Card -->
      <div class="bg-bg-card/80 backdrop-blur-[20px] border border-border mt-12 rounded-none md:rounded-sm">
        <div class="p-8 sm:p-10">
          <div class="mb-10">
            <h1 class="text-4xl sm:text-5xl font-extrabold font-display text-text-bright tracking-tight mb-2">
              SSL<span class="text-accent" style="text-shadow: 0 0 40px var(--accent);">_</span>ISSUER
            </h1>
            <p class="text-sm font-mono text-text-dim">
              Local DNS challenge manager. <span class="animate-blink inline-block w-2 bg-text-bright h-4 ml-1 align-bottom"></span>
            </p>
          </div>

          <!-- Wizard Progress - The "Thin Grid" -->
          <div class="flex items-center space-x-0 mb-10 bg-border p-[1.5px] gap-[1.5px] font-mono text-[10px] tracking-widest uppercase">
            <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step >= 1 ? 'bg-bg text-text-bright border-b border-accent' : 'bg-bg-raised text-text-dim border-b border-transparent']">
              01/ Domain
            </div>
            <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step >= 2 ? 'bg-bg text-text-bright border-b border-accent' : 'bg-bg-raised text-text-dim border-b border-transparent']">
              02/ Challenge
            </div>
            <div class="flex-1 py-2 px-3 text-center transition-colors" :class="[step === 3 ? 'bg-bg text-text-bright border-b border-accent' : 'bg-bg-raised text-text-dim border-b border-transparent']">
              03/ Export
            </div>
          </div>

          <!-- Steps with Transition -->
          <Transition name="fade" mode="out-in">
            <div :key="step">
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
        </div>
      </div>
    </div>
  </div>
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
