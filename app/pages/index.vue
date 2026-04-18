<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
    <div class="max-w-2xl w-full relative">
      <!-- Decorator Glowing blob -->
      <div class="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

      <!-- Main Glass Card -->
      <div class="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500">
        <div class="p-8">
          
          <div class="mb-8">
            <h1 class="text-3xl font-extrabold text-white tracking-tight">SSL <span class="text-emerald-400">Issuer</span></h1>
            <p class="text-sm text-neutral-400 mt-2">Generate and manage manual DNS SSL certificates locally.</p>
          </div>

          <!-- Wizard Progress -->
          <div class="flex items-center space-x-4 mb-8">
            <span :class="['text-sm font-medium', step >= 1 ? 'text-emerald-400' : 'text-neutral-500']">01. Domain</span>
            <div :class="['h-px w-8', step >= 2 ? 'bg-emerald-400/50' : 'bg-neutral-800']"></div>
            <span :class="['text-sm font-medium', step >= 2 ? 'text-emerald-400' : 'text-neutral-500']">02. Challenge</span>
            <div :class="['h-px w-8', step >= 3 ? 'bg-emerald-400/50' : 'bg-neutral-800']"></div>
            <span :class="['text-sm font-medium', step === 3 ? 'text-emerald-400' : 'text-neutral-500']">03. Export</span>
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
  reset 
} = useSslIssuer()
</script>

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
