import type { EngineResult } from '../types/ssl'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export async function runEngine<T extends EngineResult>(command: string, domain: string): Promise<T> {
  const { stdout } = await execAsync(`bash bin/engine.sh ${command} "${domain}"`)

  try {
    return JSON.parse(stdout) as T
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to parse engine response.',
      data: stdout,
    })
  }
}
