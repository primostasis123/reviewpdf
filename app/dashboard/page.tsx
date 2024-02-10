import { Dashboard } from "@/components/Dashboard";
import { getUserSubscriptionPlan } from "@/lib/paypal";
export default async function page() {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <Dashboard subscriptionPlan={subscriptionPlan} />;
}
