import { AllowanceController } from '@/controllers/allowance.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class AllowanceRouter {
  private router: Router;
  private allowanceController: AllowanceController;

  constructor() {
    this.allowanceController = new AllowanceController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.allowanceController.getAllowancesController); 
    this.router.post('/', verifyToken, this.allowanceController.createAllowanceController);
    this.router.get('/:id', verifyToken, this.allowanceController.getAllowanceController); 
    this.router.patch('/:id', verifyToken, this.allowanceController.updateAllowanceController); 
    this.router.delete('/:id', verifyToken, this.allowanceController.deleteAllowanceController); 
  }

  getRouter(): Router {
    return this.router;
  }
}
