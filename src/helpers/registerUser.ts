import axios from 'axios';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const result = await axios.post('/api/signup', {
      name,
      email,
      password
    });
    return { message: 'Success' };
  } catch (err: any) {
    return { message: err.response.data.message };
  }
};
