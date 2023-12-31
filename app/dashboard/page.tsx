import { auth } from "@/lib/auth"
import { Dashboard } from "@/components/Dashboard";
export default async function page() {
  const session = await auth();
  return (
    <Dashboard/>
    // <div>
    //   {session?.user.name} <pre>{JSON.stringify(session, null, 2)}</pre>{" "}
    //   <Dashboard/>
    // </div>
  );
}
