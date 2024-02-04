import { auth } from "@/lib/auth";
import { db } from "./db";
export async function getUserSubscriptionPlan() {
  const session = await auth();
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET_ID;

  const dbUser = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  if (!dbUser?.subscriptionId) {
    return {
      plan: "Free",
      isSubscribed: false,
      isCanceled: false,
      periodEnd: null,
    };
  }

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

  const data = await response.json();
  const accessToken = data.access_token;
  const subscriptionId = dbUser.subscriptionId;

  const subscriptionResponse = await fetch(
    `${process.env.PAYPAL_URL_API}/v1/billing/subscriptions/${subscriptionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const subscriptionData = await subscriptionResponse.json();
  // Get the current date
  let currentDate = new Date(subscriptionData.start_time);
  currentDate.setMonth(currentDate.getMonth() + 1);

  return {
    plan: subscriptionData.plan_id === process.env.PRO_PLAN ? "Pro" : "Basic",
    isSubscribed: true,
    isCanceled: subscriptionData.status === "ACTIVE" ? false : true,
    periodEnd : subscriptionData.status === "ACTIVE" ? null : currentDate
  };
}
