import type { Rule } from "markdownlint";
import { addErrorContext } from "markdownlint/helpers";
import { addRangeToSet, filterByTypes } from "../micromark-helpers";

const MDC018: Rule = {
  "names": [ "MDC018", "mdc-no-missing-space-atx" ],
  "description": "No space after hash on atx style heading",
  "tags": [ "headings", "atx", "spaces" ],
  "parser": "micromark",
  "function": function MDC018(params, onError) {
    const { lines, parsers: { micromark: { tokens } } } = params;
    const ignoreBlockLineNumbers = new Set();
    
    for (const ignoreBlock of filterByTypes(tokens, [ "codeFenced", "codeIndented", "htmlFlow", "componentContainer" ])) {
      addRangeToSet(ignoreBlockLineNumbers, ignoreBlock.startLine, ignoreBlock.endLine);
    }
    for (const [ lineIndex, line ] of lines.entries()) { 
      if (
        !ignoreBlockLineNumbers.has(lineIndex + 1) &&
        /^#+[^# \t]/.test(line) &&
        !/#\s*$/.test(line) &&
        !line.startsWith("#️⃣")
      ) {
        // @ts-ignore
        const hashCount = /^#+/.exec(line)[0].length;
        addErrorContext(
          onError,
          lineIndex + 1,
          line.trim(),
          undefined,
          undefined,
          [ 1, hashCount + 1 ],
          {
            "editColumn": hashCount + 1,
            "insertText": " "
          }
        );
      }
    }
  }
};

export default MDC018;
