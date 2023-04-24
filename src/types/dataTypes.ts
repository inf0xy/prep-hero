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
  list_name: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags?: string[];
  companies: string[];
  description?: string;
  leetcode_link: string;
  solution_vid_link: string;
};

export type SearchCriteria = {
  category: string;
  difficulty: string;
  tags: string[];
  companies: string[];
  text: string;
  [key: string]: string | string[]
};
