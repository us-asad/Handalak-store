import { getDiscountedPrice } from "data/functions";
import { convertCurrency } from "data/api";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email, cupon } = req.body;
  const discounts = [];
  
  if (cupon?.count) {
    const coupon = await stripe.coupons.create({
      percent_off: cupon.percentOff,
      duration: 'once',
    });

    discounts.push({ coupon: coupon.id });
  }

  for (let i = 0; i < items.length; i++) {
    items[i].price = await convertCurrency("UZS", "USD", +getDiscountedPrice(items[i].price, items[i].discount));
  }


  const transformedItems = items.map(item => ({
    description: item.subtitle,
    quantity: item.purchaseQty,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: item.image.map(img => img.url)
      },
    },
  }));
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: [process.env.STRIPE_SHIPPING_RATE_ID],
    shipping_address_collection: {
      allowed_countries: ["US", "GB", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/cabinet/orders?clearcookie=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    discounts,
    metadata: {
      email,
      coupon: JSON.stringify(cupon),
      items: JSON.stringify(items.map(({id, purchaseQty, quantity}) => ({id, purchaseQty, quantity })))
    }
  });

  res.status(200).json({ id: session.id })
};

