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

    const { name, email, userId } = req.body;

    if (!name || !userId || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await prismadb.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const updatedUser = await prismadb.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
}
