import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/auth-callback?origin=dashboard");
  }

  return (
    <div>
      {session?.user.name} <pre>{JSON.stringify(session, null, 2)}</pre>{" "}
    </div>
  );
}
