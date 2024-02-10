"use client";

import { getUserSubscriptionPlan } from "@/lib/paypal";
import { toast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface IBillingForm {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: IBillingForm) => {
  const router = useRouter();
  // const {
  //   mutate: cancelSubscription,
  //   isLoading,
  //   error,
  // } = trpc.cancelSubscription.useMutation({
  //   onError: (error) => {
  //   },
  //   onSuccess: () => {
  //     router.refresh();
  //     return toast({
  //       title: "Successfull",
  //       description: "Plan has been cancelled",
  //     });
  //   },
  // });

  return (
    <MaxWidthWrapper className="max-w-5xl">
      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          if (subscriptionPlan.isSubscribed && !subscriptionPlan.isCanceled) {
            if (confirm("Are you sure you want to cancel the plan?") == true) {
              // cancelSubscription({
              //   token: subscriptionPlan.token!,
              //   subscriptionId: subscriptionPlan.subscriptionId!,
              // });
            }
          } else {
            router.push("/pricing");
          }
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the <strong>{subscriptionPlan.plan}</strong>{" "}
              plan.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
            <Button type="submit">
              {/* {isLoading ? (
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
              ) : null}
              {subscriptionPlan.isSubscribed && !subscriptionPlan.isCanceled
                ? "Cancel Subscription"
                : "Upgrade to a Plan"} */}
            </Button>

            {subscriptionPlan.isSubscribed ? (
              <p className="rounded-full text-xs font-medium">
                {subscriptionPlan.isCanceled
                  ? "Your plan will be cancelled on" 
                  : "Your plan renews on"}{" "}
                {format(subscriptionPlan.periodEnd!, "MMMM dd,yyyy")}.
              </p>
            ) : null}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
