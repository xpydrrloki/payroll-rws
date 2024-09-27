import { AttendanceController } from '@/controllers/attendance.controller';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class AttendanceRouter {
  private router: Router;
  private attendanceController: AttendanceController;

  constructor() {
    this.attendanceController = new AttendanceController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.attendanceController.getAttendancesController);
    this.router.post('/create-attendance', verifyToken, this.attendanceController.createAttendancesController);
    this.router.patch('/', verifyToken, this.attendanceController.updateAttendanceController);
  }

  getRouter(): Router {
    return this.router;
  }
}
