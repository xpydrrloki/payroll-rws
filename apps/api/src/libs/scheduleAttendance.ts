import { createAttendancesService } from '@/services/attendance/create-attendances.service';
import schedule from 'node-schedule';

// Schedule task to run every day at midnight except Sundays
export function scheduleAttendanceTask() {
  schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: new schedule.Range(1, 6) }, async function () {
    console.log('Running attendance creation task...');
    await createAttendancesService();
  });
}
