import { getAllowanceService } from '@/services/allowance/get-allowance.service';
import { createDeductionService } from '@/services/deduction/create-deductions.service';
import { deleteDeductionService } from '@/services/deduction/delete-deduction.service';
import { getDeductionService } from '@/services/deduction/get-deduction.service';
import { getDeductionsServices } from '@/services/deduction/get-deductions.service';
import { updateDeductionService } from '@/services/deduction/update-deduction.service';
import { NextFunction, Request, Response } from 'express';

export class DeductionController {
  async getDeductionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'name',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };
      const result = await getDeductionsServices(query);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createDeductionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createDeductionService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getDeductionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await getDeductionService(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  
  async deleteDeductionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await deleteDeductionService(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateDeductionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await updateDeductionService(req.body,id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  
}
