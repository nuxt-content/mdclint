import { defineCommand } from 'citty'
import fs from 'node:fs/promises'
import { applyFixes, type Options, type Rule } from 'markdownlint'
import { printResult } from '../utils/print'
import { getFiles } from '../utils/files'
import { getMarkdownlintOptions } from '../utils/config'

export default defineCommand({
  meta: {
    name: 'mdclint',
    description: 'Markdownlint CLI'
  },
  args: {
    fix: {
      type: 'boolean',
      description: 'Automatically fix problems',
      default: false
    },
    preset: {
      type: 'string',
      description: 'Preset to use, (markdown, mdc)',
      default: 'mdc',
      values: ['markdown', 'mdc'],
    }
  },
  run: async ({ args }) => {
    const options: Options = await getMarkdownlintOptions(process.cwd(), { preset: args.preset as 'markdown' | 'mdc' })

    const files = await getFiles(args._)
    if (!files?.length) {
      return
    }

    const lint = await import('markdownlint/sync').then(m => m.lint)

    if (args.fix) {
      for (const file of files) {
        const lintTask = {
          files: [file],
          ...options
        }
        const result = lint(lintTask)[file].filter(error => error.fixInfo)

        if (result.length === 0) {
          continue
        }

        const content = await fs.readFile(file, 'utf-8')
        const fixed = applyFixes(content, result)
        await fs.writeFile(file, fixed)
      }
    }

    // Finally, print the result
    const result = lint({
      ...options,
      files,
    })

    printResult(result)
  }
})
