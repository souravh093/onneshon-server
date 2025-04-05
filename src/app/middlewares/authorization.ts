import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import verifyToken from '../utils/verifyToken';
import prisma from '../../db/db.config';

const auth = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized access',
      });
    }

    const decodedToken = (await verifyToken(
      token,
      process.env.JWT_SECRET as string,
    )) as JwtPayload;

    await prisma.user.findUniqueOrThrow({
      where: {
        email: decodedToken.email,
      },
    });

    if (roles.length > 0 && !roles.includes(decodedToken.role)) {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'Forbidden access',
      });
    }

    req.user = decodedToken;

    next();
  });
};

export default auth;
