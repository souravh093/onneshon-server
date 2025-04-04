import { User } from '@prisma/client';
import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';

const createUserIntoDB = async (payload: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new Error('You already have an account with this email');
  }

  const userData = {
    ...payload,
  };

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};


export const UserServices = {
    createUserIntoDB,
}