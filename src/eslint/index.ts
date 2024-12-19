import { rules } from './rules.js'
import { getMarkdownlintOptions } from '../utils/config';
import { createRuleChecker } from './ruleChecker.js'
import type { Linter } from 'eslint';
import type { PluginOptions } from '../../types'


export default async function (opts?: PluginOptions) {
  const ruleNames = Object.keys(rules)
  const options = await getMarkdownlintOptions(process.cwd(), {
    preset: opts?.preset,
    overrides: opts?.markdownlint?.config,
  })
  const config = options.config!

  const rulesOptions: Array<[string, unknown]> = ruleNames.map(rule => [rule, config[rule.toUpperCase()] ?? config[rule.toLowerCase()]])

  const rulesToCheck = rulesOptions.filter(([, options]) => options !== false)
  const recommendedRules = Object.fromEntries(rulesToCheck.map(([rule]) => [`mdclint/${rule.toLowerCase()}`, 'error']))

  const ruleChecker = createRuleChecker(options)
  return {
    files: options?.files ?? ['**/*.md'],
    plugins: {
      mdclint: {
        configs: {
          recommended: {
            plugins: ["mdclint"],
            rules: recommendedRules,
          },
        },
        rules: {
          ...Object.fromEntries(rulesToCheck.map(([ruleName, option]) => [
            `${ruleName.toLowerCase()}`,
            ruleChecker(rules[ruleName as keyof typeof rules])
          ])),
        }
      },
    },
    languageOptions: {
      parser: {
        parseForESLint
      },
    },
    rules: recommendedRules,
  } as Linter.Config<Linter.RulesRecord>
}


function parseForESLint(code: string, _options: unknown) {
  const lines = code.split(/\r\n?|\n/g);
  const linesCount = lines.length;
  const lastLineLength = lines[linesCount - 1].length;

  return {
    ast: {
      type: "Program",
      start: 0,
      end: 0,
      loc: {
        start: { line: 1, column: 0 },
        end: { line: linesCount, column: lastLineLength },
      },
      range: [0, linesCount],
      body: [],
      comments: [],
      tokens: [],
      code,
    },
    scopeManager: null,
    visitorKeys: undefined,
  };
}