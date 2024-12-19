import type { LintError } from "markdownlint";

export function printResult(result: Record<string, LintError[]>) {
  let totalErrors = 0;
  // ANSI escape codes for gray color
  const gray = (text: string) => `\x1b[90m${text}\x1b[0m`; // 90 is the ANSI code for gray
  const underline = (text: string) => `\x1b[4m${text}\x1b[0m`; // 4 is the ANSI code for underline
  for (const [file, errors] of Object.entries(result)) {
    if (errors.length === 0) {
      continue;
    }

    totalErrors += errors.length;

    console.log("\n" + underline(file));
    errors.forEach((error) => {
      const { lineNumber, ruleNames, ruleDescription, errorDetail } = error;
      console.log(`  ${gray(`${lineNumber}:`)} ${ruleDescription}${errorDetail ? `(${errorDetail})`: ''} ${gray(ruleNames.join(", "))}`);
    });
  }

  if (totalErrors > 0) {
    console.log(`\n${totalErrors} problems\n`);
    process.exit(1);
  }
}