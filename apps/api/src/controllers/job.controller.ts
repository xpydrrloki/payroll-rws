import { getJobsService } from '@/services/jobs/get-jobs.service';
import { NextFunction, Request, Response } from 'express';

export class JobController {
  async getJobsController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getJobsService();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
