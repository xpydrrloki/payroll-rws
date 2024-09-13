import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { EmployeeRouter } from './routers/employee.router';
import { JobRouter } from './routers/job.router';
import { AttendanceRouter } from './routers/attendance.router';
import { scheduleAttendanceTask } from './libs/scheduleAttendance';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
    this.schedules()
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const employeeRouter = new EmployeeRouter();
    const jobRouter = new JobRouter();
    const attendanceRouter = new AttendanceRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Welcome to Personalia Application`);
    });

    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/employee', employeeRouter.getRouter());
    this.app.use('/api/job', jobRouter.getRouter());
    this.app.use('/api/attendance', attendanceRouter.getRouter());
  }
  private schedules(): void{
  //  scheduleAttendanceTask()
  // JANGAN LUPA DINYALAIN LAGI
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
