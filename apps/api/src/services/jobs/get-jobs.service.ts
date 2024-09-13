import prisma from "@/prisma"

export const getJobsService = async () => {
    try {
        const jobs = await prisma.department.findMany({include:{JobTitle:true}})
        return jobs
    } catch (error) {
        throw error
    }
}