# MDC Lint

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Lint Markdown and MDC files with [markdownlint](https://github.com/DavidAnson/markdownlint).
MDC Lint ships a CLI and an ESLint flat-config plugin tuned for Nuxt Content style Markdown.

- CLI with glob support and `--fix`
- ESLint plugin with recommended rules for Markdown/MDC
- Presets: `mdc` (default) with custom MDC rules, or `markdown` for plain Markdown
- Respects existing `.markdownlint.*` config files and supplies sane defaults

## Installation

```bash
# with npm
npm install -D mdclint

# with pnpm
pnpm add -D mdclint
```

## CLI

Lint files directly from the terminal:

```bash
npx mdclint "content/**/*.md"
```

Options:

- `--preset [mdc|markdown]` (default: `mdc`) — use MDC-specific rules or standard
Markdown rules only.
- `--fix` — apply autofixable markdownlint suggestions in-place.

The CLI:

- Accepts files or glob patterns and expands directories automatically.
- Loads the first `.markdownlint.*` config it finds in the project root; if none exists,
it uses a default config that disables some noisy markdownlint rules (e.g. `MD041`,
line length checks via `MD013`) and enables MDC-specific rules (`MDC007`, `MDC018`, `MDC022`,
`MDC023`, `MDC031`, `MDC032`, `MDC034`, `MDC058`).

Examples:

```bash
# Lint all docs using the MDC preset
npx mdclint docs/**/*.md

# Lint plain Markdown and apply fixes
npx mdclint README.md --preset markdown --fix
```

## ESLint Plugin (flat config)

Use MDC Lint as part of your flat ESLint config:

```js
// eslint.config.mjs
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { mdcLint } from 'mdclint'

export default createConfigForNuxt({})
  .append(await mdcLint({
    files: ['content/**/*.md'],      // defaults to ['**/*.md']
    preset: 'mdc',                   // or 'markdown'
    config: { md013: { line_length: 100 } } // optional markdownlint overrides
  }))
```

What the plugin provides:

- Recommended rules under the `mdclint/*` namespace (all enabled as `error` by default).
- A parser stub compatible with Markdown files.
- Support for `.markdownlint.*` configs; pass `config` to override rules inline, or
`preset: 'markdown'` to disable MDC-specific rules.

## Configuration

- MDC Lint will load the first `.markdownlint.*` file in your project root (`.yaml`, `.yml`, `.json`, `.js`, `.cjs`, etc.).
- Built-in defaults loosen some markdownlint rules for content sites (e.g. allow
missing “first line is a top-level heading” requirement (`MD041`), loosen line length checks (`MD013`), and add MDC-specific checks).
Override any rule in your config or via the plugin’s `config` option.
- Use `preset: 'markdown'` (CLI flag or plugin option) to lint plain Markdown without MDC custom rules.

## Development

```bash
pnpm install        # install dependencies
pnpm lint           # run ESLint
pnpm prepack        # build the package
```

## Related Projects

MDC Lint is built on top of [markdownlint](https://github.com/DavidAnson/markdownlint)
and inspired by:

- [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)
- [eslint-plugin-markdownlint](https://github.com/paweldrozd/eslint-plugin-markdownlint)

## License

[MIT License](https://github.com/nuxt-content/mdclint/blob/main/LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/mdclint/latest.svg?style=flat&colorA=020420&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/mdclint

[npm-downloads-src]: https://img.shields.io/npm/dm/mdclint.svg?style=flat&colorA=020420&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/mdclint

[license-src]: https://img.shields.io/github/license/nuxt-content/mdclint.svg?style=flat&colorA=020420&colorB=28CF8D
[license-href]: https://github.com/nuxt-content/mdclint/blob/main/LICENSE
