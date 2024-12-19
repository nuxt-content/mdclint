import { glob } from 'glob'
import fs from 'node:fs/promises';
import { resolve } from 'node:path';

export async function getFiles(files: string[]) {
  const resolvedFiles = files.map(file => resolve(process.cwd(), file))

  const matchedFiles: string[] = []

  for (const file of resolvedFiles) {
    const stat = await fs.stat(file).catch(() => null)
    if (stat?.isFile()) {
      matchedFiles.push(file)
    } else {
      const path = stat?.isDirectory() ? `${file}/**` : file
      const files = await glob(path, { nodir: true, absolute: true })
      matchedFiles.push(...files)
    }
  }
  
  return matchedFiles
}