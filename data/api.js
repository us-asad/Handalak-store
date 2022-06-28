import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Router from "next/router";

const exchangeRatesEndpoint = process.env.NEXT_PUBLIC_EXCHANGE_RATES_ENDPOINT;
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

export const convertCurrency = async (from, to, amount) => {
  const result = await axios.get(`${exchangeRatesEndpoint}/${from}`,);

  const exchangeRate = result?.data?.conversion_rates[to];
  return (amount * exchangeRate).toFixed(0);
}

export const createCheckOutSession = async (user, items, coupon, redirect) => {
  if (!user?.id)
    return Router.push(`/login?redirect=${redirect}`);

  const stripe = await stripePromise;
  const checkoutSession = await axios.post('/api/create-stripe-session', {
    email: user?.email,
    items,
    coupon
  });
  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  if (result.error) {
    console.error(result.error.message);
  }
}
