import { normalizeDateToMidnight } from '@/helpers/normalizeDate';
import prisma from '@/prisma';
import { AttendanceStatus, Prisma } from '@prisma/client';

export const createAttendancesService = async () => {
    try {
      const employeeIds = await prisma.employee.findMany({
        select: { id: true },
      });

      const entryRecord = employeeIds.map<Prisma.AttendanceCreateManyInput>((id)=>({
        employeeId: id.id,
        date: new Date(normalizeDateToMidnight(new Date().toISOString())),
        status: AttendanceStatus.MANGKIR
      }))
      
      const newData = await prisma.attendance.createMany({
        data:entryRecord,
        skipDuplicates: true
      });

      return {message:`${newData.count} data presensi berhasil dibuat untuk ${employeeIds.length} orang karyawan.`}

    } catch (error) {
        throw error
    }
  };
