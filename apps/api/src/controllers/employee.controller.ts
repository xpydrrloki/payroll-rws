import { loginService } from '@/services/auth/login.service';
import { createEmployeeService } from '@/services/employee/create-employee.service';
import { getEmployeesService } from '@/services/employee/get-employees.service';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class EmployeeController {
  async getEmployeeController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'name',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        role: (res.locals.user.role as Role) || '',
      };
      const result = await getEmployeesService(query);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createEmployeeController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      
      const result = await createEmployeeService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
