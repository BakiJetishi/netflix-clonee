import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import prismadb from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: 'Name and user ID are required' });
    }

    let user = await prismadb.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const existingProfile = await prismadb.profiles.findFirst({
      where: {
        name,
        userId: user.id,
      },
    });

    if (existingProfile) {
      return res.status(400).json({ error: 'Profile name already exists' });
    }

    const profile = await prismadb.profiles.create({
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
