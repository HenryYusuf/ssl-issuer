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

          <!-- Step 1: Input Domain -->
          <Transition name="fade" mode="out-in">
            <div v-if="step === 1" key="step1" class="space-y-6">
              <div>
                <label for="domain" class="block text-sm font-medium text-neutral-300">Target Domain</label>
                <div class="mt-2 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UIcon name="i-heroicons-globe-alt" class="text-neutral-500 h-5 w-5" />
                  </div>
                  <input v-model="domain" type="text" name="domain" id="domain" 
                         class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-neutral-700 bg-neutral-800/50 text-white rounded-lg py-3 transition-colors" 
                         placeholder="sub.example.com"
                         :disabled="loading"
                         @keyup.enter="requestIssue" />
                </div>
              </div>
              <button @click="requestIssue" :disabled="loading || !domain" 
                      class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!loading">Initialize Challenge</span>
                <span v-else class="flex items-center">
                  <UIcon name="i-heroicons-arrow-path" class="animate-spin -ml-1 mr-2 h-5 w-5" /> Processing...
                </span>
              </button>
            </div>

            <!-- Step 2: DNS Challenge -->
            <div v-else-if="step === 2" key="step2" class="space-y-6">
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
                  <button @click="copyToClipboard(challengeData.challenge_domain)" class="text-neutral-500 group-hover:text-white transition-colors" title="Copy Hostname">
                    <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
                  </button>
                </div>

                <div class="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700/50 flex justify-between items-center group">
                  <div class="w-full pr-4 overflow-hidden">
                    <label class="text-xs text-neutral-400 uppercase font-semibold">Value</label>
                    <p class="font-mono text-white mt-1 truncate">{{ challengeData.txt_value }}</p>
                  </div>
                  <button @click="copyToClipboard(challengeData.txt_value)" class="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0" title="Copy Value">
                    <UIcon name="i-heroicons-clipboard-document" class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div class="flex space-x-4">
                <button @click="step = 1" :disabled="loading" class="flex-1 py-3 px-4 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium">
                  Cancel
                </button>
                <button @click="verifyChallenge" :disabled="loading"
                        class="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none transition-all disabled:opacity-50">
                  <span v-if="!loading">Verify & Issue</span>
                  <span v-else class="flex items-center justify-center">
                    <UIcon name="i-heroicons-arrow-path" class="animate-spin -ml-1 mr-2 h-5 w-5" /> Verifying...
                  </span>
                </button>
              </div>
            </div>

            <!-- Step 3: Summary -->
            <div v-else-if="step === 3" key="step3" class="space-y-6">
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
                    <button @click="copyToClipboard(certData.cert)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
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
                    <button @click="copyToClipboard(certData.key)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
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
                    <button @click="copyToClipboard(certData.fullchain)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
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
                    <button @click="copyToClipboard(certData.ca)" class="text-neutral-400 hover:text-white text-xs flex items-center transition-colors">
                      <UIcon name="i-heroicons-clipboard" class="h-4 w-4 mr-1"/> Copy
                    </button>
                  </div>
                  <div class="p-4 overflow-auto flex-1 font-mono text-xs text-neutral-500/80 whitespace-pre">
                    {{ certData.ca }}
                  </div>
                </div>
              </div>

              <div class="pt-4 text-center">
                <button @click="step = 1; domain = ''" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  Issue Another Certificate
                </button>
              </div>

            </div>
          </Transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toast = useToast()

const step = ref(1)
const loading = ref(false)
const domain = ref('')

const challengeData = ref({
  challenge_domain: '',
  txt_value: ''
})

const certData = ref({
  cert: '',
  key: '',
  ca: '',
  fullchain: ''
})

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.add({
      title: 'Copied!',
      description: 'Copied to clipboard.',
      color: 'green'
    })
  } catch (err) {
    toast.add({
      title: 'Failed to copy',
      color: 'red'
    })
  }
}

const requestIssue = async () => {
  if (!domain.value) return
  loading.value = true
  try {
    const data = await $fetch('/api/ssl/issue', {
      method: 'POST',
      body: { domain: domain.value }
    })
    
    challengeData.value = {
      challenge_domain: data.challenge_domain,
      txt_value: data.txt_value
    }
    step.value = 2
  } catch (err) {
    toast.add({
      title: 'Error',
      description: err.response?.data?.statusMessage || 'An error occurred during issuance.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

const verifyChallenge = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/ssl/verify', {
      method: 'POST',
      body: { domain: domain.value }
    })
    
    certData.value = {
      cert: data.cert,
      key: data.key,
      ca: data.ca,
      fullchain: data.fullchain
    }
    step.value = 3
  } catch (err) {
    toast.add({
      title: 'Verification Failed',
      description: err.response?.data?.statusMessage || 'Failed to verify DNS challenge. Ensure propagation has reached Let\'s Encrypt.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
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
