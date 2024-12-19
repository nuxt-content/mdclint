# MD Lint

MD Lint is a tool for linting Markdown and MDC files. 

The package offers a CLI and a eslint plugin.


## CLI

You can use the CLI to link your markdown files using `npx mdclint`.

```bash
npx mdclint content/**/*.md
```

## ESLint Plugin

- Install the plugin in your project

```bash
npm install mdclint
```

- Add the plugin to your eslint config, for example in `eslint.config.mjs`  

```js
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { mdcLint } from 'mdclint'

export default createConfigForNuxt({})
  .append(mdcLint())
```

- Run eslint

```bash
eslint .
```

