import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { getSession } from 'next-auth/react';
import prismadb from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error('You need to sign in');
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new Error('Old password and new password are required');
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.hashedPassword) {
      throw new Error('Password is required');
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      user.hashedPassword
    );

    if (!isPasswordMatch) {
      throw new Error('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        hashedPassword,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
