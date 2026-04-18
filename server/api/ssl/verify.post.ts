// @env node
import type { EngineResult, ShowResult } from '../../types/ssl'
import { DOMAIN_REGEX } from '../../utils/constants'

export default defineEventHandler(async (event): Promise<ShowResult> => {
  const body = await readBody(event)
  const { domain } = body

  if (!domain || typeof domain !== 'string' || !DOMAIN_REGEX.test(domain)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain format.',
    })
  }

  try {
    // 1. Run Verification
    const verifyResult = await runEngine<EngineResult>('verify', domain)

    if (!verifyResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: verifyResult.error || 'Verification failed.',
        data: verifyResult.details,
      })
    }

    // 2. Fetch resulting certs
    const showResult = await runEngine<ShowResult>('show', domain)

    if (!showResult.success) {
      throw createError({
        statusCode: 500,
        statusMessage: showResult.error || 'Failed to fetch generated certificates.',
      })
    }

    return showResult
  }
  catch (error: any) {
    if (error.statusCode)
      throw error

    console.error('Verify error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Verification process sequence failed.',
      data: error.stderr || error.stdout || undefined,
    })
  }
})
