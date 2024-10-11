import { createManyPayrollService } from '@/services/payroll/create-many-payroll.service';
import { scheduleJob } from 'node-schedule';

export const schedulePayrollTask = () => {
  scheduleJob('0 0 1,16 * *', async () => {
    console.log('Running payroll job...');
    try {
      await createManyPayrollService();
    } catch (error) {
      console.error('Error creating payroll entries:', error);
    }
  });
};
