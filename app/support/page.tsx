import Support from "@/components/Support";
import { getUserSubscriptionPlan } from "@/lib/paypal";
import { redirect } from "next/navigation";
export default async function page() {
  const subscriptionPlan = await getUserSubscriptionPlan();
    if (!subscriptionPlan.isSubscribed) {
        redirect("/")
  }
  return <Support />;
}
