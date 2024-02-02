import { auth } from "@/lib/auth"
import { Dashboard } from "@/components/Dashboard";
export default async function page() {


  const session = await auth();


  const clientId = 'AbEaJSSvLTzjcZJylDGlEQ5fQgUHzfkjlp4B9aGUgGEQT5T7qAVVBSDoY2GFmx_2Ae8QZzlQ1R8F9eaN';
  const clientSecret = "EDOyZe3RN7TSlyVAlkIixLsS-G8cu5zTpGGonwl3amXM0Q_EdHglnrwVxkiO6bjKdMsJgq-m1I0nXgj5";

  const response = await fetch(`${process.env.PAYPAL_URL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  console.log(data.access_token)

  const accessToken = data.access_token;
  const subscriptionId = "I-0SU8JNG6F43B"

  const subscriptionResponse = await fetch(`${process.env.PAYPAL_URL_API}/v1/billing/subscriptions/${subscriptionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const subscriptionData = await subscriptionResponse.json();
  console.log(subscriptionData);


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
