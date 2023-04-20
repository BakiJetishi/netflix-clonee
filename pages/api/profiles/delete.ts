import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import prismadb from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'DELETE') {
      return res.status(405).end();
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const profile = await prismadb.profiles.delete({
      where: {
        id: id,
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
