export interface RuleDefinition {
  name: string;
  description: string;
  url: string;
  fixable?: 'code' | 'whitespace';
}

export const rules: Record<string, RuleDefinition> = {
  MD001: {
    name: "md001",
    description: "Heading levels should only increment by one level at a time",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md001",
  },
  MD003: {
    name: "md003",
    description: "Heading style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md003",
  },
  MD004: {
    name: "md004",
    description: "Unordered list style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md004",
    fixable: "code",
  },
  MD005: {
    name: "md005",
    description: "Inconsistent indentation for list items at the same level",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md005",
  },
  MD007: {
    name: "md007",
    description: "Unordered list indentation",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md007",
    fixable: "whitespace",
  },
  MD009: {
    name: "md009",
    description: "Trailing spaces",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md009",
    fixable: "whitespace",
  },
  MD010: {
    name: "md010",
    description: "Hard tabs",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md010",
    fixable: "whitespace",
  },
  MD011: {
    name: "md011",
    description: "Reversed link syntax",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md011", 
    fixable: "code",
  },
  MD012: {
    name: "md012",
    description: "Multiple consecutive blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md012",
    fixable: "whitespace",
  },
  MD013: {
    name: "md013",
    description: "Line length",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md013",
  },
  MD014: {
    name: "md014",
    description: "Dollar signs used before commands without showing output",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md014",
    fixable: "code",
  },
  MD018: {
    name: "md018",
    description: "No space after hash on atx style heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md018",
    fixable: "whitespace",
  },
  MD019: {
    name: "md019",
    description: "Multiple spaces after hash on atx style heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md019",
    fixable: "whitespace",
  },
  MD020: {
    name: "md020",
    description: "No space inside hashes on closed atx style heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md020",
    fixable: "whitespace",
  },
  MD021: {
    name: "md021",
    description: "Multiple spaces inside hashes on closed atx style heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md021",
    fixable: "whitespace",
  },
  MD022: {
    name: "md022",
    description: "Headings should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md022",
    fixable: "whitespace",
  },
  MD023: {
    name: "md023",
    description: "Headings must start at the beginning of the line",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md023",
    fixable: "whitespace",
  },
  MD024: {
    name: "md024",
    description: "Multiple headings with the same content",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md024",
  },
  MD025: {
    name: "md025",
    description: "Multiple top-level headings in the same document",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md025",
  },
  MD026: {
    name: "md026",
    description: "Trailing punctuation in heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md026",
    fixable: "code",
  },
  MD027: {
    name: "md027",
    description: "Multiple spaces after blockquote symbol",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md027",
    fixable: "whitespace",
  },
  MD028: {
    name: "md028",
    description: "Blank line inside blockquote",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md028",
  },
  MD029: {
    name: "md029",
    description: "Ordered list item prefix",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md029",
  },
  MD030: {
    name: "md030",
    description: "Spaces after list markers",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md030",
    fixable: "whitespace",
  },
  MD031: {
    name: "md031",
    description: "Fenced code blocks should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md031",
    fixable: "whitespace",
  },
  MD032: {
    name: "md032",
    description: "Lists should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md032",
    fixable: "whitespace",
  },
  MD033: {
    name: "md033",
    description: "Inline HTML",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md033",
  },
  MD034: {
    name: "md034",
    description: "Bare URL used",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md034",
    fixable: "code",
  },
  MD035: {
    name: "md035",
    description: "Horizontal rule style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md035", 
  },
  MD036: {
    name: "md036",
    description: "Emphasis used instead of a heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md036",
  },
  MD037: {
    name: "md037",
    description: "Spaces inside emphasis markers",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md037",
    fixable: "code",
  },
  MD038: {
    name: "md038",
    description: "Spaces inside code span elements",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md038",
    fixable: "code",
  },
  MD039: {
    name: "md039",
    description: "Spaces inside link text",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md039",
    fixable: "code",
  },
  MD040: {
    name: "md040",
    description: "Fenced code blocks should have a language specified",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md040",
  },
  MD041: {
    name: "md041",
    description: "First line in a file should be a top-level heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md041", 
  },
  MD042: {
    name: "md042",
    description: "No empty links",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md042",
  },
  MD043: {
    name: "md043",
    description: "Required heading structure",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md043",
  },
  MD044: {
    name: "md044",
    description: "Proper names should have the correct capitalization",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md044",
    fixable: "code",
  },
  MD045: {
    name: "md045",
    description: "Images should have alternate text (alt text)",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md045",
  },
  MD046: {
    name: "md046",
    description: "Code block style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md046",
  },
  MD047: {
    name: "md047",
    description: "Files should end with a single newline character",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md047",
    fixable: "whitespace",
  },
  MD048: {
    name: "md048",
    description: "Code fence style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md048",
  },
  MD049: {
    name: "md049",
    description: "Emphasis style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md049",
    fixable: "code",
  },
  MD050: {
    name: "md050",
    description: "Strong style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md050",
    fixable: "code",
  },
  MD051: {
    name: "md051",
    description: "Link fragments should be valid",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md051"
  },
  MD052: {
    name: "md052",
    description: "Reference links and images should use a label that is defined",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md052",
  },
  MD053: {
    name: "md053",
    description: "Link and image reference definitions should be needed",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md053",
  },
  MD054: {
    name: "md054",
    description: "Link and image style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md054",
  },
  MD055: {
    name: "md055",
    description: "Table pipe style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md055",
  },
  MD056: {
    name: "md056",
    description: "Table column count",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md056"
  },
  MD058: {
    name: "md058",
    description: "Tables should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md058",
    fixable: "code",
  },
  MD059: {
    name: "md059",
    description: "Link text should be descriptive",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md059",
  },
  MD060: {
    name: "md060",
    description: "Table column style",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md060",
  },
  MDC007: {
    name: "mdc007",
    description: "Unordered list indentation",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md007",
    fixable: "whitespace",
  },
  MDC018: {
    name: "mdc018",
    description: "No space after hash on atx style heading",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md018",
    fixable: "whitespace",
  },
  MDC022: {
    name: "mdc022",
    description: "Headings should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md022",
    fixable: "whitespace",
  },
  MDC023: {
    name: "mdc023",
    description: "Headings must start at the beginning of the line",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md023",
    fixable: "whitespace",
  },
  MDC031: {
    name: "mdc031",
    description: "Fenced code blocks should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md031",
  },
  MDC032: {
    name: "mdc032",
    description: "Lists should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md032",
  },
  MDC034: {
    name: "mdc034",
    description: "Spaces inside code span elements",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md034",
    fixable: "code",
  },
  MDC058: {
    name: "mdc058",
    description: "Tables should be surrounded by blank lines",
    url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md058",
    fixable: "code",
  },
}
