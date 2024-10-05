import { DeductionController } from '@/controllers/deduction.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class DeductionRouter {
  private router: Router;
  private deductionController: DeductionController;

  constructor() {
    this.deductionController = new DeductionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.deductionController.getDeductionsController);
    this.router.post('/', verifyToken, this.deductionController.createDeductionsController);
    this.router.get('/:id', verifyToken, this.deductionController.getDeductionController); 
    this.router.patch('/:id', verifyToken, this.deductionController.updateDeductionController); 
    this.router.delete('/:id', verifyToken, this.deductionController.deleteDeductionController); 

  }

  getRouter(): Router {
    return this.router;
  }
}
