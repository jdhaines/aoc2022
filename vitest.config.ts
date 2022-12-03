import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // exclude: ['*.spec.js', '**/node_modules/**'],
    include: ['**/*.spec.ts'],
  },
})
