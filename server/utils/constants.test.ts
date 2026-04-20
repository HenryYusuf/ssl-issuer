import { describe, expect, it } from 'vitest'
import { DOMAIN_REGEX } from './constants'

describe('dOMAIN_REGEX', () => {
  it('should match valid domains', () => {
    expect(DOMAIN_REGEX.test('example.com')).toBe(true)
    expect(DOMAIN_REGEX.test('sub.example.com')).toBe(true)
    expect(DOMAIN_REGEX.test('my-domain.net')).toBe(true)
  })

  it('should not match invalid domains', () => {
    expect(DOMAIN_REGEX.test('example.com/path')).toBe(false)
    expect(DOMAIN_REGEX.test('example.com?query')).toBe(false)
    expect(DOMAIN_REGEX.test('invalid_domain')).toBe(false)
  })
})
