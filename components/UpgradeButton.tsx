"use client";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "./ui/use-toast";

interface IButtonWrapper {
  type: string;
  plan_id: string;
}

const ButtonWrapper = ({ type, plan_id }: IButtonWrapper) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: updateSub } = trpc.updateSubscription.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!!",
        description: "Please enjoy your subscription",
      });
      router.refresh()
    },
  });

  return (
    <PayPalButtons
      options={{ vault: true }}
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: plan_id,
          })
          .then((orderId) => {
            return orderId;
          });
      }}
      // @ts-ignore
      onApprove={(data, actions) => {
        // Capture the funds from the transaction
        // if (actions.subscription) {
        return actions.subscription?.get().then(function (details) {
          updateSub({ subscriptionID: data.subscriptionID!});
        });
        // } else {
        //   return Promise.resolve();
        // }
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

interface IUpgradeButton {
  plan_id: string;
  client_id: string;
}
const UpgradeButton = ({ plan_id, client_id }: IUpgradeButton) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: client_id,
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}
    >
      <ButtonWrapper type="subscription" plan_id={plan_id} />
    </PayPalScriptProvider>
  );
};

export default UpgradeButton;
