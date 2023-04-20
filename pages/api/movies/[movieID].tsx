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

    const { movieID } = req.query;

    if (typeof movieID !== 'string') {
      throw new Error('Id need to be a string');
    }

    let movies;

    movies = await prismadb.movie.findMany({
      where: {
        genre: movieID,
      },
    });

    if (!movies || movies.length === 0) {
      movies = await prismadb.movie.findUnique({
        where: {
          id: movieID,
        },
      });
    }

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).end();
  }
}
