import { rules } from "./rules";

export const allRulesDisabled = Object.keys(rules).reduce((o, key) => {
  o[key] = false;
  return o;
}, {} as Record<string, boolean>);

export const formatMessage = ({ ruleDescription, errorDetail, errorContext }) => {
  let message = "";
  message += ruleDescription;
  if (errorDetail) {
    message += ": " + errorDetail;
  }

  if (errorContext) {
    message += ` [Context: ${errorContext}]`;
  }

  return message;
};

export const getLocation = ({ lineNumber, errorRange }) => {
  return {
    start: {
      line: lineNumber,
      column: errorRange ? errorRange[0] : 0,
    },
    end: {
      line: lineNumber,
      column: errorRange ? errorRange[0] + errorRange[1] : 0,
    },
  };
};
