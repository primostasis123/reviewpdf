import { auth } from "@/lib/auth";
// import { db } from "./db";
export async function getUserSubscriptionPlan() {
  const session = await auth();
  return {
    subscriptionId : null,
    plan: "Free",
    isSubscribed: false,
    isCanceled: false,
    periodEnd: null,
    token: null,
  };


  // const clientId = process.env.PAYPAL_CLIENT_ID;
  // const clientSecret = process.env.PAYPAL_SECRET_ID;

  // const dbUser = await db.user.findFirst({
  //   where: {
  //     id: session?.user.id,
  //   },
  // });

  // if (!dbUser?.subscriptionId) {
  //   return {
  //     subscriptionId : null,
  //     plan: "Free",
  //     isSubscribed: false,
  //     isCanceled: false,
  //     periodEnd: null,
  //     token: null,
  //   };
  // }

  // const response = await fetch(
  //   `${process.env.PAYPAL_URL_API}/v1/oauth2/token`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
  //     },
  //     body: "grant_type=client_credentials",
  //   }
  // );

  // const data = await response.json();
  // const accessToken = data.access_token;
  // const subscriptionId = dbUser.subscriptionId;

  // const subscriptionResponse = await fetch(
  //   `${process.env.PAYPAL_URL_API}/v1/billing/subscriptions/${subscriptionId}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );

  // const subscriptionData = await subscriptionResponse.json();
  // // Get the current date
  // const periodEnd = new Date(subscriptionData.start_time);
  // periodEnd.setMonth(periodEnd.getMonth() + 1);
  // const currentDate = new Date()

  // if (periodEnd <= currentDate) {
  //   if (subscriptionData.status === "CANCELLED") {
  //     return {
  //       subscriptionId : null,
  //       plan: "Free",
  //       isSubscribed: false,
  //       isCanceled: false,
  //       periodEnd: null,
  //       token: null,
  //     };
  //   }
  // }
  
  // return {
  //   subscriptionId : subscriptionId,
  //   plan: subscriptionData.plan_id === process.env.PRO_PLAN ? "Pro" : "Basic",
  //   isSubscribed: true,
  //   isCanceled: subscriptionData.status === "ACTIVE" ? false : true,
  //   periodEnd: subscriptionData.status === "ACTIVE" ? subscriptionData.billing_info.next_billing_time : periodEnd,
  //   token : data.access_token
  // };
}
