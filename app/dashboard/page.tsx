

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { trpc } from "../_trpc/client";
export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/auth-callback?origin=dashboard");
  }

  const { data, isLoading } = trpc.test.useQuery();
  console.log(data);
  return (
    <div>
      {session?.user.name} <pre>{JSON.stringify(session, null, 2)}</pre>{" "}
    </div>
  );
}
