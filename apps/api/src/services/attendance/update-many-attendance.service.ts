import prisma from '@/prisma';
import { AttendanceStatus } from '@prisma/client';

export const updateManyAttendanceService = async (body: {
  ids: string[];
  status: AttendanceStatus;
}) => {
  try {
    const { ids, status } = body;
    const parsedIDs = ids.map((val) => parseInt(val, 10));

    const existingRecords = await prisma.attendance.findMany({
      where: {
        id: { in: parsedIDs },
      },
      select: { id: true }, // Only select the IDs to reduce data overhead
    });

    // Step 2: Ensure all IDs have matching records
    const existingIDs = existingRecords.map((record) => record.id);
    const missingIDs = parsedIDs.filter((id) => !existingIDs.includes(id));

    if (missingIDs.length > 0) {
      throw new Error(
        `The following IDs are invalid or do not exist: ${missingIDs.join(', ')}`,
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updateData = await tx.attendance.updateMany({
        where: { id: { in: parsedIDs } },
        data: { status },
      });
      return updateData;
    });
    const count = result.count;
    return { message: `Data presensi sejumlah: ${count}, berhasil diubah.` };
  } catch (error) {
    throw error;
  }
};
