export type GeneralFormData = {
  listNames: string[];
  title: string;
  difficulty: string;
  category: string;
  tags: string[];
  companies: string[];
  leetcodeLink: string;
  videoLink: string;
};

export type Problem = {
  list_names: string[] | undefined;
  title: string | undefined;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string | undefined;
  category: string | undefined;
  tags?: string[] | undefined;
  companies: string[] | undefined;
  description?: string | undefined;
  leetcode_link: string | undefined;
  solution_link: string | undefined;
  prompts: { python: string; javascript: string } | undefined;
  solution_codes: { python: string; javascript: string } | undefined;
  [key: string]: any;
};

export type SearchCriteria = {
  listName: string;
  category: string;
  difficulty: string;
  tags: string[];
  companies: string[];
  text: string;
  [key: string]: string | string[];
};

export type Note = {
  listName: string | undefined;
  title: string | undefined;
  content: string | undefined;
};
export type AttemptedProblem = { title: string };
export type EasySolved = { title: string };
export type MediumSolved = { title: string };
export type HardSolved = { title: string };
export type Submission = {
  date: Date;
  title: string;
  code: string;
  language: string;
  accepted: boolean;
};

export type Option = {
  label: string;
  value: string;
};

export type NotificationType = {
  status: 'success' | 'error' | 'warning' | undefined;
  message: string | undefined;
};

export type CodeOptions = {
  fontSize: number;
  tabSize: number;
  readOnly: boolean
};

export type CodeLine = {
  line: string;
  node: Element;
};

export type SearchOrForm = SearchCriteria | GeneralFormData;

export type Result = {
  test: { [key: string]: any };
  output: object;
  result: string;
};

export type RunResult = {
  results: Result[];
  runtime: string;
  stdOut: string[];
};

export type ResultMessage = {
  passResult: boolean;
  testPassed: string;
  testFailed: string;
  failedTestCases: Result[];
  runtime: string;
  stdOut: string[];
};
