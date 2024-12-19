import { lint } from 'markdownlint/sync'
import { allRulesDisabled, formatMessage, getLocation } from "./utils";
import type { RuleDefinition } from './rules';
import type { LintError, Options } from 'markdownlint';
import type { Rule, SourceCode } from 'eslint';

const getRange = (src: SourceCode, err: LintError) => {
  const errorLine = (err.fixInfo?.lineNumber || err.lineNumber) - 1;
  const text = src.getText().split(/\r\n?|\n/g);
  const charsBefore = text
    .slice(0, errorLine)
    .reduce((acc, line) => line.length + 1 + acc, 0);

  let start, end;
  if (err.fixInfo === null) {
    start = charsBefore;
    end = start + text[err.lineNumber - 1].length + 1;

    return [start, end];
  }
  
  if (
    err.lineNumber === text.length &&
    err.fixInfo &&
    (err.fixInfo!.deleteCount || 0) < 0
  ) {
    start = src.getIndexFromLoc({
      line: err.lineNumber + (err.fixInfo!.deleteCount || 0),
      column: 0,
    });
    end = src.getIndexFromLoc({
      line: err.lineNumber,
      column: text[err.lineNumber - 1].length,
    });

    return [start, end];
  } 

  if (err.fixInfo && (err.fixInfo!.deleteCount || 0) < 0) {
    start = src.getIndexFromLoc({ line: err.lineNumber, column: 0 });
    end = src.getIndexFromLoc({
      line: err.lineNumber - (err.fixInfo!.deleteCount || 0),
      column: 0,
    });

    return [start, end];  
  }

  start = charsBefore + (err.fixInfo!.editColumn || 1) - 1;
  end = start + (err.fixInfo!.deleteCount || 0);

  return [start, end];
};

const md012Preprocessor = (errors: LintError[]) => {
  const deleteLineErrors = errors.filter(
    (err) => err.fixInfo && err.fixInfo.deleteCount === -1
  );
  const others = errors.filter((err) => !err.fixInfo || err.fixInfo.deleteCount !== -1);

  const joinedErrors: LintError[] = [];
  let line: number | null = null;
  deleteLineErrors.forEach((dle) => {
    if (!line) {
      joinedErrors.push(dle);
      line = dle.lineNumber;
    } else if (dle.lineNumber === line + 1) {
      joinedErrors[joinedErrors.length - 1].fixInfo!.deleteCount! +=
        dle.fixInfo!.deleteCount!;
      joinedErrors[joinedErrors.length - 1].errorDetail = dle.errorDetail;
      line = dle.lineNumber;
    }
  });

  return others.concat(joinedErrors);
};

const handleErrors = (errors: LintError[], src: SourceCode) => {
  if (errors.length && errors[0].ruleNames[0] === "MD012") {
    errors = md012Preprocessor(errors);
  }

  return errors.map((err) => {
    const error = {
      loc: getLocation(err),
      message: formatMessage(err),
      fix: undefined as any,
    };

    if (err.fixInfo) {
      error.fix = function (fixer: any) {
        const range = getRange(src, err);
        if (range[0] === range[1]) {
          return fixer.insertTextBeforeRange(range, err.fixInfo?.insertText || "");
        }
        return fixer.replaceTextRange(range, err.fixInfo?.insertText || "");
      };
    }

    return error;
  });
};

const reportErrors = (context: Rule.RuleContext, errors: any[]) => {
  errors.forEach((err) => context.report(err as any));
};

export function createRuleChecker(options: Options) {
  const lintOptions = {
    ...options,
    config: allRulesDisabled
  }

  const check = (ruleId: string, src: SourceCode) => {
    const { text: errors } = lint({
      ...lintOptions,
      strings: { text: src.getText() },
      config: {
        ...allRulesDisabled,
        [ruleId]: options.config?.[ruleId.toLowerCase()] ?? options.config?.[ruleId.toUpperCase()] ?? true
      }
    });
    
  
    return errors;
  };

  return function (rule: RuleDefinition): Rule.RuleModule {
    return {
      meta: {
        type: "layout",
        docs: {
          description: rule.description,
          url: rule.url,
        },
        schema: [],
        fixable: rule.fixable,
      },
      create: function (context) {      
        return {
          Program() {
            const src = context.sourceCode;
            const errors = check(rule.name, src);            
            const handledErrors = handleErrors(errors, src);
            reportErrors(context, handledErrors);
          },
        };
      },
    }
  }
}
