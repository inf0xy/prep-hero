import { db, connectDB, disconnectDB } from '@/lib/database/db-util';

try {
  const seedDB = async () => {
    const message = await connectDB();
    console.log(message);

    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'User Object Validation',
          required: [
            'account_type',
            'oauth_type',
            'google_id',
            'github_id',
            'facebook_id',
            'name',
            'email',
            'password',
            'list',
            'hard_solved',
            'medium_solved',
            'easy_solved',
            'total_solved'
          ],
          properties: {
            account_type: { enum: ['user', 'admin'] },
            oauth_type: { bsonType: ['null', 'string'] },
            google_id: { bsonType: ['null', 'string'] },
            github_id: { bsonType: ['null', 'string'] },
            facebook_id: { bsonType: ['null', 'string'] },
            name: { bsonType: ['string'] },
            email: { bsonType: ['string', 'null'] },
            password: { bsonType: ['string', 'null'] },
            list: {
              bsonType: ['null', 'array'],
              items: {
                bsonType: ['object'],
                required: ['problem_id'],
                description: "'items' must contain the stated fields.",
                properties: {
                  problem_id: { bsonType: ['objectId'] },
                  last_attempt: {
                    bsonType: ['date', 'null'],
                    description: 'Last attempt must be a date.'
                  },
                  solved: { bsonType: ['bool'] },
                  note: { bsonType: ['string', 'null'] },
                  record: { bsonType: ['double', 'null'] }
                }
              }
            },
            easy_solved: { bsonType: 'int', minimum: 0 },
            medium_solved: { bsonType: 'int', minimum: 0 },
            hard_solved: { bsonType: 'int', minimum: 0 },
            total_solved: { bsonType: 'int', minimum: 0 }
          }
        }
      }
    });

    await db.createCollection('problems', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Problem Object Validation',
          required: [
            'title',
            'list_name',
            'difficulty',
            'category',
            'description',
            'tags',
            'solution_vid_link',
            'leetcode_link',
            'companies'
          ],
          properties: {
            title: { bsonType: ['string'] },
            list_name: { bsonType: ['string'] },
            difficulty: { enum: ['easy', 'medium', 'hard'] },
            category: { bsonType: ['string'] },
            description: { bsonType: ['string'] },
            tags: { bsonType: ['array'] },
            solution_vid_link: { bsonType: ['string'] },
            leetcode_link: { bsonType: ['string'] },
            companies: { bsonType: ['array'] }
          }
        }
      }
    });
  };

  seedDB()
    .then(() => disconnectDB())
    .then((data) => console.log(data));
} catch (err) {
  console.error(err);
}
