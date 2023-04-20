import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import prismadb from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req);

    const { currentUserProfile } = req.query;

    const selectedProfile = await prismadb.profiles.findUnique({
      where: {
        id: String(currentUserProfile),
      },
    });

    if (!selectedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json(selectedProfile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).end();
  }
}
