import bycrypt from "bcrypt";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
export const appRouter = router({
  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { fileId, cursor } = input;
      const limit = input.limit ?? 10;

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId,
        },
      });

      if (!file) {
        return { status: "PENDING" as const };
      }

      return { status: file.uploadStatus };
    }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),

  cancelSubscription: privateProcedure
    .input(z.object({ token: z.string(), subscriptionId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${process.env.PAYPAL_URL_API}/v1/billing/subscriptions/${input.subscriptionId}/cancel`, {
        method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${input.token}`
          }
      });
      if (!response.ok) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      const data = response.json()
      return "subscription cancelled successfully";

    }),
  createUser: publicProcedure
    .input(
      z.object({
        names: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db.user.findFirst({
        where: {
          email : input.email
        }
      })

      if (user) {
        throw new TRPCError({ code: "CONFLICT" })
      }

      const hashedPassword = await bycrypt.hash(input.password, 5);

      await db.user.create({
        data: {
          name: input.names,
          email: input.email,
          password:hashedPassword
        }
      })

      return "user is successfully registered";
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
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

      return file;
    }),
  
  updateSubscription: privateProcedure
    .input(z.object({ subscriptionID: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      await db.user.update({
        where: {
          id : userId
        },
        data: {
          subscriptionId: input.subscriptionID,
        },
      })
    }),

    getFilesCount: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;
      const currentDate = new Date();
      return await db.file.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
          },
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
