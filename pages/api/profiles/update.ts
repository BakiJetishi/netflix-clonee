import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import prismadb from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const { name, userId, profileId } = req.body;

    if (!name || !userId || !profileId) {
      return res
        .status(400)
        .json({ error: 'Name, user ID, and profile ID are required' });
    }

    let user = await prismadb.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    let profile = await prismadb.profiles.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!profile) {
      return res.status(400).json({ error: 'Profile does not exist' });
    }

    const existingProfile = await prismadb.profiles.findFirst({
      where: {
        name,
        userId: user.id,
        NOT: {
          id: profileId,
        },
      },
    });

    if (existingProfile) {
      return res.status(400).json({ error: 'Profile name already exists' });
    }

    profile = await prismadb.profiles.update({
      where: {
        id: profileId,
      },
      data: {
        name,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return res.status(200).json(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
}
