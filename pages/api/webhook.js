import { buffer } from "micro";
import { convertCurrency } from "data/api";
import { client, GetUserPurchasedProductsQry, UpdateProductQty, UpdateUserOrdersAndCouponQty } from "data/graphql";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (ex) {
      return res.status(400).send(`Webhook Error: ${ex.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      let { userData: { purchasedProducts, orders } } = await client.request(GetUserPurchasedProductsQry, { email: session.metadata.email });
      const prds = JSON.parse(session.metadata.items);
      const coupon = JSON.parse(session.metadata.coupon);

      const amount_subtotal = await convertCurrency("USD", "UZS", session.amount_subtotal);
      const amount_total = await convertCurrency("USD", "UZS", session.amount_total);
      
      const sessionData = {
        email: session.metadata.email,
        id: session.id,
        amount_subtotal: Number(amount_subtotal.toString().slice(0, -2)),
        amount_total: Number(amount_total.toString().slice(0, -2)),
        address: session.customer_details.address,
        coupon: coupon || null,
        products: prds,
        customer_email: session.customer_details.email,
        customer_name: session.customer_details.name,
        date: new Date().toLocaleString()
      }

      for (let i = 0; i < prds.length; i++) {
        const prd = prds[i]
        await client.request(UpdateProductQty, { id: prd.id, qty: prd.quantity - prd.purchaseQty });
      }

      await client.request(UpdateUserOrdersAndCouponQty, {
        email: session.metadata.email,
        orders: orders ? [sessionData, ...orders] : [sessionData],
        purchasedProducts: purchasedProducts ? [...new Set([...purchasedProducts, ...prds.map(({ id }) => id)])] : prds.map(({ id }) => id),
        code: coupon.code || "0",
        codeQty: coupon.count - 1
      });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}
