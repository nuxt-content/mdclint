import type { Options } from 'markdownlint'
import type { Linter } from 'eslint'

export interface PluginOptions {
  files?: string[]
  preset?: 'markdown' | 'mdc'
  markdownlint?: Options
}

export function mdcLint(options?: PluginOptions): Promise<Linter.LintResult>