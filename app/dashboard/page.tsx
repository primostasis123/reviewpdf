
import { Dashboard } from "@/components/Dashboard";
import { getUserSubscriptionPlan } from "@/lib/paypal";
export default async function page() {
  const subscriptionPlan = await getUserSubscriptionPlan();

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET_ID;

  const response = await fetch(
    `${process.env.PAYPAL_URL_API}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: "grant_type=client_credentials",
    }
  );
  
  return <Dashboard subscriptionPlan={subscriptionPlan} />;
}
