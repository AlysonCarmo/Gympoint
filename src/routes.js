import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './middlewares/auth';
// import UserController from './app/controllers/StudentController';

const routes = new Router();

// rota padrao

routes.post('/sessions', SessionController.store);
routes.use(AuthMiddleware);
routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);

export default routes;
