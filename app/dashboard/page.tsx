import { auth } from "@/lib/auth"
import { Dashboard } from "@/components/Dashboard";
import { getUserSubscriptionPlan } from "@/lib/paypal";
export default async function page() {


  const session = await auth();

  const test = await getUserSubscriptionPlan()

  console.log(test)

  // const response2 = await fetch(`https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   }
  // });

  // console.log(response2);
  

  return (
    <Dashboard/>
  );
}
