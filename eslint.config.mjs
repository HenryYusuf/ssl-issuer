import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  typescript: true,
  vue: true,

  // Ignore directories that shouldn't be linted
  ignores: [
    '.agents/**',
    'bin/**',
    '.nuxt/**',
  ],

  // Overrides for specific files or rules
  rules: {
    // Disable no-undef for now as Nuxt auto-imports are not easily detectable by raw ESLint
    'no-undef': 'off',
    // You can add more specific rules here if needed
  },
})
