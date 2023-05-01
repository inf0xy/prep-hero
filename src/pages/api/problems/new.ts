import { addNewProblems, updateProblem } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../checkAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    list_name,
    title,
    difficulty,
    category,
    tags,
    companies,
    leetcode_link,
    solution_link,
    description
  } = req.body;

  if (req.method === 'POST') {
    if (
      list_name &&
      title &&
      difficulty &&
      category &&
      tags &&
      companies &&
      leetcode_link &&
      solution_link &&
      description
    ) {
      try {
        const result = await addNewProblems({
          list_name,
          title,
          difficulty,
          category,
          tags,
          companies,
          leetcode_link,
          solution_link,
          description
        });
        res.status(201).json({ message: 'Successfully added new problem.' });
      } catch (err: any) {
        if (err.message.includes('duplicate key error')) {
          res.status(422).json({ message: 'Title already existed.' });
        } else {
          console.error(err);
          res.status(500).json({ message: 'Unable to add new problems.' });
        }
      }
    } else {
      res.status(422).json({ message: 'Invalid input' });
    }
  } else if (req.method === 'PUT') {
    if (
      list_name &&
      title &&
      difficulty &&
      category &&
      tags &&
      companies &&
      leetcode_link &&
      solution_link &&
      description
    ) {
      try {
        const result = await updateProblem({
          list_name,
          title,
          difficulty,
          category,
          tags,
          companies,
          leetcode_link,
          solution_link,
          description
        });
        res.status(200).json({ message: 'Successfully updated problem.' });
      } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: 'Unable to update problems.' });
      }
    } else {
      res.status(422).json({ message: 'Invalid input' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid' });
  }
};

export default checkAuth(handler);
