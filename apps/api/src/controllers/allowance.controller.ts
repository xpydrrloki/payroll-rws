import { createAllowanceService } from '@/services/allowance/create-allowance.service';
import { deleteAllowanceService } from '@/services/allowance/delete-allowance.service';
import { getAllowanceService } from '@/services/allowance/get-allowance.service';
import { getAllowancesServices } from '@/services/allowance/get-allowances.service';
import { updateAllowanceService } from '@/services/allowance/update-allowance.service';
import { NextFunction, Request, Response } from 'express';

export class AllowanceController {
  async getAllowancesController(
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
      const result = await getAllowancesServices(query);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createAllowanceController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createAllowanceService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getAllowanceController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await getAllowanceService(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteAllowanceController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await deleteAllowanceService(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateAllowanceController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);

      const result = await updateAllowanceService(req.body, id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
