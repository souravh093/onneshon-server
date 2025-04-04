import { Router } from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { TModuleRoute } from '../types/moduleRoute.type';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
