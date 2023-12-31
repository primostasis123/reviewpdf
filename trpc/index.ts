import { privateProcedure, publicProcedure, router } from './trpc'
import { db } from '@/lib/db'
export const appRouter = router({
    test: publicProcedure.query(() => {
        return 3
    }),

    getUserFiles: privateProcedure.query(async ({ctx}) => {
        const { userId } = ctx
        return await db.file.findMany({
            where: {
                userId
            }
        })
       
    })
})

export type AppRouter = typeof appRouter