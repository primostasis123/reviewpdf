import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
export const appRouter = router({
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
        },
      });
        
        return file
    }),
});

export type AppRouter = typeof appRouter;
