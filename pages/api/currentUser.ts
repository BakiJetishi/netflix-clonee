import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

async function current(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export default current;
