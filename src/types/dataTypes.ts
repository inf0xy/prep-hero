export type GeneralFormData = {
  listName: string;
  title: string;
  difficulty: string;
  category: string;
  tags: string[];
  companies: string[];
  leetcodeLink: string;
  videoLink: string;
};

export type Problem = {
  list_name: string | undefined;
  title: string | undefined;
  difficulty: 'Easy' | 'Medium' | 'Hard' | undefined;
  category: string | undefined;
  tags?: string[] | undefined;
  companies: string[] | undefined;
  description?: string | undefined;
  leetcode_link: string | undefined;
  solution_link: string | undefined;
  [key: string]: any;
};

export type SearchCriteria = {
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
export type Submission = { date: Date; title: string; code: string };

export type NotificationType = {
  status: 'success' | 'error' | 'warning' | undefined;
  message: string | undefined;
};
