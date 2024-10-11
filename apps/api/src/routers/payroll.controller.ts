import { PayrollController } from '@/controllers/payroll.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class PayrollRouter {
  private router: Router;
  private payrollController: PayrollController;

  constructor() {
    this.payrollController = new PayrollController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', verifyToken, this.payrollController.createPayrollController);
  }

  getRouter(): Router {
    return this.router;
  }
}
