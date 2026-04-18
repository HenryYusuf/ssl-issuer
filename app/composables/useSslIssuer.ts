import { ref } from 'vue'
import type { IssueResult, ShowResult } from '~/../server/types/ssl'

export function useSslIssuer() {
  const toast = useToast()

  const step = ref(1)
  const loading = ref(false)
  const domain = ref('')

  const challengeData = ref({
    challenge_domain: '',
    txt_value: '',
  })

  const certData = ref({
    cert: '',
    key: '',
    ca: '',
    fullchain: '',
  })

  const reset = () => {
    step.value = 1
    domain.value = ''
    challengeData.value = { challenge_domain: '', txt_value: '' }
    certData.value = { cert: '', key: '', ca: '', fullchain: '' }
  }

  const verifyChallenge = async () => {
    loading.value = true
    try {
      const data = await $fetch<ShowResult>('/api/ssl/verify', {
        method: 'POST',
        body: { domain: domain.value },
      })

      certData.value = {
        cert: data.cert,
        key: data.key,
        ca: data.ca,
        fullchain: data.fullchain,
      }
      step.value = 3
    }
    catch (err: any) {
      toast.add({
        title: 'Verification Failed',
        description: err.response?.data?.statusMessage || 'Failed to verify DNS challenge. Ensure propagation has reached Let\'s Encrypt.',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  const requestIssue = async () => {
    if (!domain.value)
      return
    loading.value = true
    try {
      const data = await $fetch<IssueResult>('/api/ssl/issue', {
        method: 'POST',
        body: { domain: domain.value },
      })

      if (data.already_verified) {
        toast.add({
          title: 'Already Verified',
          description: 'Domain is already verified. Fetching certificates...',
          color: 'success',
        })
        await verifyChallenge()
        return
      }

      challengeData.value = {
        challenge_domain: data.challenge_domain || '',
        txt_value: data.txt_value || '',
      }
      step.value = 2
    }
    catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.response?.data?.statusMessage || 'An error occurred during issuance.',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.add({
        title: 'Copied!',
        description: 'Copied to clipboard.',
        color: 'success',
      })
    }
    catch {
      toast.add({
        title: 'Failed to copy',
        color: 'error',
      })
    }
  }

  return {
    step,
    loading,
    domain,
    challengeData,
    certData,
    requestIssue,
    verifyChallenge,
    copyToClipboard,
    reset,
  }
}
