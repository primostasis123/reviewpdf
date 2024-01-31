"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

interface IButtonWrapper {
    type: string;
    plan_id : string
}
const ButtonWrapper = ({ type, plan_id }: IButtonWrapper) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: plan_id
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

interface IUpgradeButton {
    plan_id: string;
}
const UpgradeButton = ({ plan_id }: IUpgradeButton) => {
         
console.log(plan_id)
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.CLIENT_ID!,
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
