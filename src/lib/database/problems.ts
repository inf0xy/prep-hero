import { connectDB, problemsCollection } from './db-util';

const ITEMS_PER_PAGE = 50;

type SearchFilter = {
  [key: string]: any;
  category?: string;
  difficulty?: string;
  tags?: any;
  companies?: any;
  text?: string;
};

export default class Problem {
  constructor(
    public list_name: string,
    public title: string,
    public difficulty: string,
    public category: string,
    public tags: string[],
    public companies: string[],
    public leetcode_link: string,
    public solution_vid_link: string,
    public description: string
  ) {
    this.list_name = list_name;
    this.title = title;
    this.difficulty = difficulty;
    this.category = category;
    this.tags = tags;
    this.companies = companies;
    this.leetcode_link = leetcode_link;
    this.solution_vid_link = solution_vid_link;
    this.description = description;
  }
}

export const addNewProblems = async (problem: Problem) => {
  const newProblem = new Problem(
    problem.list_name,
    problem.title,
    problem.difficulty,
    problem.category,
    problem.tags,
    problem.companies,
    problem.leetcode_link,
    problem.solution_vid_link,
    problem.description
  );
  await connectDB();
  return problemsCollection.insertOne(problem);
};

// export const updateProblem = async (problem: Problem) => {
//   await connectDB();
// };

export const getProblems = async (
  page: number,
  categoryFilter: string,
  difficultyFilter: string,
  tagsFilter: string,
  companiesFilter: string,
  textFilter: string
) => {
  await connectDB();
  const filters: SearchFilter = {};

  tagsFilter = tagsFilter ? JSON.parse(tagsFilter) : [];
  companiesFilter = companiesFilter ? JSON.parse(companiesFilter) : [];

  if (categoryFilter !== '') {
    filters['category'] = categoryFilter;
  }
  if (difficultyFilter !== '') {
    filters['difficulty'] = difficultyFilter;
  }
  if (tagsFilter.length > 0) {
    filters['tags'] = { $in: tagsFilter };
  }
  if (companiesFilter.length > 0) {
    filters['companies'] = { $in: companiesFilter };
  }
  if (textFilter !== '') {
    filters['$text'] = { $search: textFilter };
    // filters['$or'] = [
    //   { title: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
    //   { category: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
    //   { difficulty: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
    //   { tags: { $elemMatch: { $regex: new RegExp(`^${textFilter}$`, 'i') } } },
    //   { companies: { $elemMatch: { $regex: new RegExp(`^${textFilter}$`, 'i') } } }
    // ];
  }

  return problemsCollection
    .find(filters, { projection: { _id: 0, tags: 0, description: 0 } })
    .skip(--page * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .toArray();
};
