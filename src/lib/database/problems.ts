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
    public list_names: string[],
    public title: string,
    public difficulty: string,
    public category: string,
    public tags: string[],
    public companies: string[],
    public leetcode_link: string,
    public solution_link: string,
    public description: string,
    public prompts: { python: string, javascript: string}
  ) {
    this.list_names = list_names;
    this.title = title;
    this.difficulty = difficulty;
    this.category = category;
    this.tags = tags;
    this.companies = companies;
    this.leetcode_link = leetcode_link;
    this.solution_link = solution_link;
    this.description = description;
    this.prompts = prompts
  }
}

export const addNewProblems = async (problem: Problem) => {
  const newProblem = new Problem(
    problem.list_names.includes('comprehensive') ? [] : problem.list_names,
    problem.title,
    problem.difficulty,
    problem.category,
    problem.tags,
    problem.companies,
    problem.leetcode_link,
    problem.solution_link,
    problem.description,
    problem.prompts
  );
  await connectDB();
  return problemsCollection.insertOne(problem);
};

export const updateProblem = async (problem: Problem) => {
  await connectDB();
  return problemsCollection.updateOne(
    { title: problem.title },
    {
      $set: {
        list_names: problem.list_names.includes('comprehensive')
          ? []
          : problem.list_names,
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        tags: problem.tags,
        companies: problem.companies,
        leetcode_link: problem.leetcode_link,
        solution_link: problem.solution_link,
        description: problem.description,
        prompts: problem.prompts
      }
    }
  );
};

export const getProblems = async (
  page: number,
  listNameFilter: string,
  categoryFilter: string,
  difficultyFilter: string,
  tagsFilter: string,
  companiesFilter: string,
  textFilter: string
) => {
  await connectDB();
  const filters: SearchFilter = {};
  const skipNum = --page * ITEMS_PER_PAGE;

  tagsFilter = tagsFilter ? JSON.parse(tagsFilter) : [];
  companiesFilter = companiesFilter ? JSON.parse(companiesFilter) : [];

  if (categoryFilter !== '') {
    filters['category'] = categoryFilter;
  }
  if (listNameFilter !== '') {
    filters['list_names'] = listNameFilter;
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
    filters['$or'] = [
      {
        list_names: {
          $elemMatch: { $regex: new RegExp(`^${textFilter}$`, 'i') }
        }
      },
      { title: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
      { category: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
      { difficulty: { $regex: new RegExp(`^${textFilter}$`, 'i') } },
      { tags: { $elemMatch: { $regex: new RegExp(`^${textFilter}$`, 'i') } } },
      {
        companies: {
          $elemMatch: { $regex: new RegExp(`^${textFilter}$`, 'i') }
        }
      }
    ];
  }

  let count = await problemsCollection.countDocuments(filters);

  let result = await problemsCollection
    .find(filters, { projection: { _id: 0 } })
    .skip(skipNum)
    .limit(ITEMS_PER_PAGE)
    .toArray();

  if (result.length === 0) {
    delete filters['$or'];
    filters['$text'] = { $search: textFilter };
    result = await problemsCollection
      .find(filters, { projection: { _id: 0 } })
      .skip(skipNum)
      .limit(ITEMS_PER_PAGE)
      .toArray();
  }
  return { count, problems: result };
};

export const getProblemsCount = async () => {
  await connectDB();

  const filters = [
    {
      $match: {
        $or: [
          { difficulty: 'Easy' },
          { difficulty: 'Medium' },
          { difficulty: 'Hard' }
        ]
      }
    }
  ];

  const pipeline = [
    {
      $facet: {
        easyCount: [
          { $match: { difficulty: 'Easy' } },
          { $count: 'easyCount' }
        ],
        mediumCount: [
          { $match: { difficulty: 'Medium' } },
          { $count: 'mediumCount' }
        ],
        hardCount: [{ $match: { difficulty: 'Hard' } }, { $count: 'hardCount' }]
      }
    }
  ];

  const result = await problemsCollection
    .aggregate([...filters, ...pipeline])
    .toArray();

  return [
    result[0].easyCount[0],
    result[0].mediumCount[0],
    result[0].hardCount[0]
  ];
};

export const getProblemTitles = async () => {
  await connectDB();
  return problemsCollection
    .find({}, { projection: { title: 1, _id: 0 } })
    .toArray();
};

export const getProblemByTitle = async (title: string) => {
  await connectDB();
  return problemsCollection.findOne({ title }, { projection: { _id: 0 } });
};
