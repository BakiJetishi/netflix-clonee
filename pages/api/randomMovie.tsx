import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prisma';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const countMovies = await prismadb.movie.count();
    const randomNumber = Math.floor(countMovies * Math.random());

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomNumber,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    return res.status(500).end();
  }
}
