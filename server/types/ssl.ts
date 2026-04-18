export interface EngineResult {
  success: boolean
  error?: string
  details?: any
}

export interface IssueResult extends EngineResult {
  challenge_domain?: string
  txt_value?: string
  already_verified?: boolean
}

export interface ShowResult extends EngineResult {
  cert: string
  key: string
  ca: string
  fullchain: string
}
