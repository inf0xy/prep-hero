import { addNewProblems } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';
import sanitizeHtml from 'sanitize-html';

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
    const sanitizedDescription = sanitizeHtml(description);
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
        description: sanitizedDescription
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
};

export default handler;