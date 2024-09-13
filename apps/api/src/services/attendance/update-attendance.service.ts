import prisma from "@/prisma"
import { AttendanceStatus } from "@prisma/client"

export const updateAttendanceService = async (body:{id:number, status:AttendanceStatus}) => {
    try {
        const {id, status} = body
        const existingData = await prisma.attendance.findFirst({where:{id}})
        if(!existingData){
            throw new Error("Data tidak ditemukan.")
        }
        const updateData = await prisma.attendance.update({
            where:{id},
            data:{status}
        })
        return {message:"Data presensi berhasil diubah."}
    } catch (error) {
        throw error
    }
}