// @env node
import type { IssueResult } from '../../types/ssl'
import { DOMAIN_REGEX } from '../../utils/constants'

export default defineEventHandler(async (event): Promise<IssueResult> => {
  const body = await readBody(event)
  const { domain } = body

  if (!domain || typeof domain !== 'string' || !DOMAIN_REGEX.test(domain)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain format.',
    })
  }

  try {
    const result = await runEngine<IssueResult>('issue', domain)

    if (!result.success) {
      throw createError({
        statusCode: 500,
        statusMessage: result.error || 'Unknown error occurred.',
        data: result.details,
      })
    }

    return result
  }
  catch (error: any) {
    if (error.statusCode)
      throw error

    console.error('Issue error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to issue SSL challenge.',
      data: error.stderr || error.stdout || undefined,
    })
  }
})
