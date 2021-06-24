// Since all files in the API folder
// are server-side only, we can import from
// the database statically at the top
import { getAllUsers, insertUser } from '../../../util/database';

// An API Route needs to define the response
// that is returned to the user
export default async function usersHandler(req, res) {
  if (req.method === 'GET') {
    const users = await getAllUsers();
    return res.status(200).json({ users: users });
  } else if (req.method === 'POST') {
    const user = await insertUser(req.body.firstName, req.body.lastName);
    return res.status(200).json({ user: user });
  }

  res.status(400).json(null);
}
