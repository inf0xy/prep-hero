import { connectDB, testCasesCollection } from './db-util';

export default class Test {
  constructor(
    public title: string,
    public python: object,
    public javascript: object
  ) {
    this.title = title;
    this.python = python;
    this.javascript = javascript;
  }
}

export const addNewTest = async (test: any) => {
  await connectDB();
  const filter = { title: test.title };
  const update = {
    $set: {
      title: test.title,
      python: test.python,
      javascript: test.javascript
    }
  };
  const options = { upsert: true, writeConcern: { w: 'majority' } as const };
  return testCasesCollection.updateOne(filter, update, options);
};

export const getSingleTest = async (title: string) => {
  await connectDB();
  const result = await testCasesCollection.findOne({ title });
  return result;
};

export const getTests = async (
  title: string,
  language: string,
  caseType: string
) => {
  await connectDB();

  const projection = {
    _id: 0,
    [language]: {
      tests: {
        [caseType]: 1
      },
      testfile: 1
    }
  };

  return testCasesCollection.findOne({ title }, { projection });
};
