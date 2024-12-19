import type { Rule, RuleOnError } from "markdownlint";
import { addErrorContext, isBlankLine } from "markdownlint/helpers";
import { filterByTypes, getParentOfType } from "../micromark-helpers";

const isBlockComponentStart = (line: string) => line.match(/^\s*:{2,}\w+/)
const isBlockComponentEnd = (line: string) => line.match(/^\s*:{2,}\s*$/)
const isBlockComponentSlot = (line: string) => line.match(/^\s*#\w+/)

const codeFencePrefixRe = /^(.*?)[`~]/;

// eslint-disable-next-line jsdoc/valid-types
/** @typedef {readonly string[]} ReadonlyStringArray */

/**
 * Adds an error for the top or bottom of a code fence.
 *
 * @param {import("markdownlint").RuleOnError} onError Error-reporting callback.
 * @param {ReadonlyStringArray} lines Lines of Markdown content.
 * @param {number} lineNumber Line number.
 * @param {boolean} top True iff top fence.
 * @returns {void}
 */
function addError(onError: RuleOnError, lines: readonly string[], lineNumber: number, top?: boolean) {
  const line = lines[lineNumber - 1];
  const [ , prefix ] = line.match(codeFencePrefixRe) || [];
  const fixInfo = (prefix === undefined) ?
    undefined :
    {
      "lineNumber": lineNumber + (top ? 0 : 1),
      "insertText": `${prefix.replace(/[^>]/g, " ").trim()}\n`
    };
  addErrorContext(
    onError,
    lineNumber,
    line.trim(),
    undefined,
    undefined,
    undefined,
    fixInfo
  );
}

const MDC031: Rule = {
  "names": [ "MDC031", "mdc-blanks-around-fences" ],
  "description": "Fenced code blocks should be surrounded by blank lines",
  "tags": [ "code", "blank_lines" ],
  "parser": "micromark",
  "function": function MD031(params, onError) {
    const listItems = params.config.list_items;
    const includeListItems = (listItems === undefined) ? true : !!listItems;
    const { lines } = params;
    for (const codeBlock of filterByTypes(params.parsers.micromark.tokens, [ "codeFenced" ])) {
      if (includeListItems || !(getParentOfType(codeBlock, [ "listOrdered", "listUnordered" ]))) {
        if (!isBlankLine(lines[codeBlock.startLine - 2]) && !isBlockComponentStart(lines[codeBlock.startLine - 2]) && !isBlockComponentSlot(lines[codeBlock.startLine - 2])) {
          addError(onError, lines, codeBlock.startLine, true);
        }
        if (!isBlankLine(lines[codeBlock.endLine]) && !isBlankLine(lines[codeBlock.endLine - 1])) {
          if (!isBlockComponentEnd(lines[codeBlock.endLine]) && !isBlockComponentStart(lines[codeBlock.endLine - 1])) {
            addError(onError, lines, codeBlock.endLine, false);
          }
        }
      }
    }
  }
};

export default MDC031;
