import { buffer } from "micro";
import { gql, GraphQLClient } from "graphql-request";
import { convertCurrency } from "data/api";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
  },
});

const updateQuery = gql`
  mutation UpdateUserData($purchasedProducts: Json!, $email: String!, $orders: Json!, $code: String!, $codeQty: Int!) {
    updateUserData(data: {purchasedProducts: $purchasedProducts, orders: $orders}, where: {email: $email}) { id }
    publishUserData(where: {email: $email}) { id }
    updateCupon(where: { code: $code }, data: { count: $codeQty }) { id }
    publishCupon(where: { code: $code }) { id }
  }
`;

const updatePrdsQuery = gql`
  mutation UpdateProductQty($id: ID!, $qty: Int!) {
    updateProduct(where: { id: $id }, data: { quantity: $qty }) { id }
    publishProduct(where: { id: $id }) { id }
  }
`;

const getPurchasedProductsQry = gql`
  query GetPurchasedProducts($email: String!) {
    userData(where: { email: $email }) {
      purchasedProducts,
      orders
    }
  }
`;


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
      console.log("WEBHOOk ERRRORRRR ", ex);
      return res.status(400).send(`Webhook Error: ${ex.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      let { userData: { purchasedProducts, orders } } = await client.request(getPurchasedProductsQry, { email: session.metadata.email });
      const prds = JSON.parse(session.metadata.items);
      const coupon = JSON.parse(session.metadata.coupon);

      const sessionData = {
        email: session.metadata.email,
        id: session.id,
        amount_subtotal: convertCurrency("USD", "USZ", session.amount_subtotal),
        amount_total: convertCurrency("USD", "USZ", session.amount_total),
        address: session.customer_details.address,
        coupon: coupon || null,
        products: prds,
        customer_email: session.customer_details.email,
        customer_name: session.customer_details.name,
        date: new Date().toLocaleString()
      }

      for (let i = 0; i < prds.length; i++) {
        const prd = prds[i]
        await client.request(updatePrdsQuery, { id: prd.id, qty: prd.quantity - prd.purchaseQty });
      }

      await client.request(updateQuery, {
        email: session.metadata.email,
        orders: orders ? [sessionData, ...orders] : [sessionData],
        purchasedProducts: purchasedProducts ? [...new Set([...purchasedProducts, ...prds.map(({id}) => id)])] : prds.map(({id}) => id),
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
