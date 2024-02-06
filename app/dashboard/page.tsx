import { Dashboard } from "@/components/Dashboard";
import { auth } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/paypal";
export default async function page() {
  const session = await auth()
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <Dashboard subscriptionPlan={subscriptionPlan} />;
}
