import { AuthController } from '@/controllers/auth.controller';
import { EmployeeController } from '@/controllers/employee.controller';
import { verifyRole } from '@/middlewares/verifyRole';
import { verifyToken } from '@/middlewares/verifyToken';
import { verifyUser } from '@/middlewares/verifyUser';
import { Router } from 'express';

export class EmployeeRouter {
  private router: Router;
  private employeeController: EmployeeController;

  constructor() {
    this.employeeController = new EmployeeController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      this.employeeController.getEmployeeController,
    );
    this.router.post(
      '/',
      verifyToken,
      verifyUser,
      verifyRole,
      this.employeeController.createEmployeeController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
