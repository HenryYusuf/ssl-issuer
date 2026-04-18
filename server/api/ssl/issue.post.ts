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
    // Escape shell argument just to be perfectly safe, although regex filters it already
    const { stdout, stderr } = await execAsync(`bash bin/engine.sh issue "${domain}"`)
    
    // Engine script prints JSON to standard output.
    const result = JSON.parse(stdout)
    if (!result.success) {
       throw createError({
         statusCode: 500,
         statusMessage: result.error || 'Unknown error occurred.',
         data: result.details
       })
    }
    
    return result

  } catch (error: any) {
    console.error('Issue error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to issue SSL challenge.',
      data: error.stderr || error.stdout || undefined
    })
  }
})
