// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { mdcLint } from './src/index.ts'

export default createConfigForNuxt({})
  .append(mdcLint({
    files: ['**/*.md']
  }))
