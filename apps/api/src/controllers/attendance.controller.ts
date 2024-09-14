import { createAttendancesService } from '@/services/attendance/create-attendances.service';
import { getAttendancesService } from '@/services/attendance/get-attendances.service';
import { updateAttendanceService } from '@/services/attendance/update-attendance.service';
import { NextFunction, Request, Response } from 'express';

export class AttendanceController {
  async getAttendancesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'date',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        jobTitleId: parseInt(req.query.jobTitleId as string) || undefined,
        departmentId: parseInt(req.query.departmentId as string) || undefined,
        date: (req.query.date as string) || undefined

        // employeeId: parseInt(req.query.employeeId as string),
      };
      const result = await getAttendancesService(query);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateAttendanceController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateAttendanceService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createAttendancesController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createAttendancesService();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
