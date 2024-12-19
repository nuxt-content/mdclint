import { loadConfig } from 'c12'
import { glob } from 'glob'
import type { Configuration, Options, Rule } from 'markdownlint'
import MDC018 from './rules/mdc018'
import MDC032 from './rules/mdc032'
import MDC007 from './rules/mdc007'
import MDC034 from './rules/mdc034'
import MDC031 from './rules/mdc031'

interface MarkdownlintOptions {
  preset?: 'markdown' | 'mdc'
  overrides?: Configuration
}

export async function getConfig(root: string, overrides?: Configuration): Promise<Configuration> {
  const configFiles = await glob('.markdownlint.*', { cwd: root, dot: true })


  const { config } = await loadConfig<Configuration>({
    configFile: configFiles?.[0] ?? '.markdownlint.yaml',
    cwd: root,
    defaultConfig: {
      // Overridden rules
      "MD018": false, // No extra spaces after blockquote
      "MD032": false, // Lists should be surrounded by blank lines
      "MD007": false, // Unordered list indentation
      "MD034": false, // No bare URL used
      "MD031": false, // Fenced code blocks should be surrounded by blank lines
      // Configured rules
      "MD025": {
        "front_matter_title": '' // Ignore front matter title
      },
      // Disabled rules
      "MD041": false, // First line in file should be a top level header
    }
  })

  if (overrides) {
    return { ...config, ...overrides }
  }

  return config
}

export async function getMarkdownlintOptions(root: string, opts: MarkdownlintOptions): Promise<Options> {
  const config = await getConfig(root, opts.overrides)

  const options: Options = {
    config,
  }

  if (opts.preset === 'mdc') {
    options.customRules = [
      MDC018,
      MDC032,
      MDC007,
      MDC034,
      MDC031,
    ] as Rule[]
  }

  return options
}