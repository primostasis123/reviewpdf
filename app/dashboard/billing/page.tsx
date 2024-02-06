import BillingForm from "@/components/BillingForm";
import { getUserSubscriptionPlan } from "@/lib/paypal";

export default async function page() {
    const subscriptionPlan = await getUserSubscriptionPlan();
    return <BillingForm subscriptionPlan={subscriptionPlan} />
}
