import { EmptyCart, OrderCard } from 'components';
import { getCookie, removeCookies } from 'cookies-next'
import { getOrdersWithPrdImages, getUserOrders } from 'data/graphql';
import React from 'react'

export default function Orders({ email, orders }) {
  if (!email) return (
    <div className='grid place-content-center min-h-[80vh]'>
      <h1 className='text-4xl'>Iltimos Buyurtmalarni ko&apos;rish uchun akkountingizga kiring</h1>
    </div>
  );

  if (!orders?.length) return <EmptyCart title="Afsuski siz heli hech narsa buyurtma qilmadingiz 😭" subtitle='Xarid qilishni hoziroq boshlang!' />

  return (
    <div className='custom-container mx-auto min-h-[80vh] space-y-4'>
      {orders.map((odr, i) => <OrderCard key={i} {...odr} />)}
    </div >
  );
}

export async function getServerSideProps({ req, res, query }) {
  if (query.clearcookie) {
    removeCookies("basket", { req, res });
  }

  const email = getCookie("user_id", { req, res });

  if (email) {
    const ordersMetaData = await getUserOrders(email || null);
    const orders = await getOrdersWithPrdImages(ordersMetaData);

    return {
      props: { email, orders }
    }
  }

  return { props: { email: null, orders: [] } }
}
