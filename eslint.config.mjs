// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { mdcLint } from 'mdclint'

export default createConfigForNuxt({})
  .append(mdcLint())
