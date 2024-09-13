import { JobController } from '@/controllers/job.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class JobRouter {
  private router: Router;
  private jobController: JobController;

  constructor() {
    this.jobController = new JobController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.jobController.getJobsController);
  }

  getRouter(): Router {
    return this.router;
  }
}
