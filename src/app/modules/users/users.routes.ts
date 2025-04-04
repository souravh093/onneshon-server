import { Router } from 'express';
import validation from '../../middlewares/validation';
import { UserValidations } from './users.validation';
import { UserController } from './users.controller';

const router = Router();

router.post(
  '/',
  validation(UserValidations.userCreateValidation),
  UserController.createUser,
);

export const UserRoutes = router;