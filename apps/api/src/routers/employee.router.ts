import { AuthController } from '@/controllers/auth.controller';
import { EmployeeController } from '@/controllers/employee.controller';
import { verifyToken } from '@/middlewares/verifyToken';
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
    this.router.get('/', verifyToken,this.employeeController.getEmployeeController);
  }

  getRouter(): Router {
    return this.router;
  }
}
