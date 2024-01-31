"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";


interface IButtonWrapper {
    type : string
}
const ButtonWrapper = ({ type } : IButtonWrapper) => {
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

	return (<PayPalButtons
		createSubscription={(data, actions) => {
			return actions.subscription
				.create({
					plan_id: "",
				})
				.then((orderId) => {
					// Your code here after create the order
					return orderId;
				});
		}}
		style={{
			label: "subscribe",
		}}
	/>);
}




const UpgradeButton = () => {
    return (
        <PayPalScriptProvider
        options={{
            clientId: "test",
            components: "buttons",
            intent: "subscription",
            vault: true,
        }}
    >
        <ButtonWrapper type="subscription" />
    </PayPalScriptProvider>
  );
};

export default UpgradeButton;
