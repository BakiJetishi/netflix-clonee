import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
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

    const movies = await prisma.movie.findMany({});

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
