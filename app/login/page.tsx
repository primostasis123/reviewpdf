import Login from "@/components/Login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth()
  if (session) {
    redirect("/")
  }
  return <Login />;
}
