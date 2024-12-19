import type { Rule, MicromarkToken } from "markdownlint";
import { addErrorContext } from "markdownlint/helpers";
import { filterByPredicate, getHtmlTagInfo, inHtmlFlow } from "../micromark-helpers";

/** @typedef {import("micromark-extension-gfm-autolink-literal")} */

/** @type {import("markdownlint").Rule} */
const MDC034: Rule = {
  "names": [ "MDC034", "mdc-no-bare-urls" ],
  "description": "Bare URL used",
  "tags": [ "links", "url" ],
  "parser": "micromark",
  "function": function MDC034(params, onError) {
    const literalAutolinks = (tokens: MicromarkToken[]) => (
      filterByPredicate(
        tokens,
        (token: MicromarkToken) => {
          if ((token.type === "literalAutolink") && !inHtmlFlow(token)) {
            // Detect and ignore https://github.com/micromark/micromark/issues/164
            const siblings = token.parent?.children;
            const index = siblings?.indexOf(token);
            // @ts-ignore
            const prev = siblings?.at(index - 1);
            // @ts-ignore
            const next = siblings?.at(index + 1);
            return !(
              prev &&
              next &&
              (prev.type === "data") &&
              (next.type === "data") &&
              prev.text.endsWith("<") &&
              next.text.startsWith(">")
            );
          }
          return false;
        },
        (token: MicromarkToken) => {
          // Ignore yaml data section
          if (token.type === 'componentContainerDataSection') {
            return []
          }
          // Ignore content of inline HTML tags
          const { children } = token;
          const result = [];
          for (let i = 0; i < children.length; i++) {
            const current = children[i];
            const openTagInfo = getHtmlTagInfo(current);
            if (openTagInfo && !openTagInfo.close) {
              let count = 1;
              for (let j = i + 1; j < children.length; j++) {
                const candidate = children[j];
                const closeTagInfo = getHtmlTagInfo(candidate);
                if (closeTagInfo && (openTagInfo.name === closeTagInfo.name)) {
                  if (closeTagInfo.close) {
                    count--;
                    if (count === 0) {
                      i = j;
                      break;
                    }
                  } else {
                    count++;
                  }
                }
              }
            } else {
              result.push(current);
            }
          }
          return result;
        }
      )
    );
    for (const token of literalAutolinks(params.parsers.micromark.tokens)) {
      const range = [
        token.startColumn,
        token.endColumn - token.startColumn
      ];
      const fixInfo = {
        "editColumn": range[0],
        "deleteCount": range[1],
        "insertText": `<${token.text}>`
      };
      addErrorContext(
        onError,
        token.startLine,
        token.text,
        undefined,
        undefined,
        range,
        fixInfo
      );
    }
  }
};

export default MDC034;
