import { TRPCError, initTRPC } from "@trpc/server";
import { auth } from "@/lib/auth";
const t = initTRPC.create();
const middleware = t.middleware;
const isAuth = middleware(async (opts) => {
  const session = await auth();
  if (!session || !session?.user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

    return opts.next({
        ctx: {
            userId: session?.user.id,
            session,
      },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)
