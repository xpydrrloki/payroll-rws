import { createManyPayrollService } from '@/services/payroll/create-many-payroll.service';
import { NextFunction, Request, Response } from 'express';

export class PayrollController {
  async createPayrollController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createManyPayrollService();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
