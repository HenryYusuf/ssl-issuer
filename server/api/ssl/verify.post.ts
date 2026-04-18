import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { domain } = body

  if (!domain || typeof domain !== 'string' || !/^[a-zA-Z0-9.-]+$/.test(domain)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain format.'
    })
  }

  try {
    // 1. Run Verification
    const verifyCmd = await execAsync(`bash bin/engine.sh verify "${domain}"`)
    const verifyResult = JSON.parse(verifyCmd.stdout)
    
    if (!verifyResult.success) {
      throw createError({
         statusCode: 400,
         statusMessage: verifyResult.error || 'Verification failed.',
         data: verifyResult.details
      })
    }

    // 2. Fetch resulting certs
    const showCmd = await execAsync(`bash bin/engine.sh show "${domain}"`)
    const showResult = JSON.parse(showCmd.stdout)

    if (!showResult.success) {
      throw createError({
         statusCode: 500,
         statusMessage: showResult.error || 'Failed to fetch generated certificates.'
      })
    }

    return showResult

  } catch (error: any) {
    console.error('Verify error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Verification process sequence failed.',
      data: error.stderr || error.stdout || undefined
    })
  }
})
