import { EmptyCart, ProductsContainer } from 'components';
import { checkCookies, getCookie } from 'cookies-next';
import { getProductsById } from 'data/graphql';
import React from 'react'
import { useSelector } from 'react-redux';
import { addItems } from 'redux/slices/storedProducts';
import { wrapper } from 'redux/store';
import { SEO } from 'subcomponents';

export default function Favorite() {
  const { savedProducts } = useSelector(state => state.storedProducts);

  return (
    <div className='custom-container mx-auto mt-3 mb-9'>
      <SEO title="Favorite products" />
      {savedProducts?.length
        ? (
          <>
            <h1 className='md:text-4xl text-xl'>Savimlilar mahsuotlar</h1>
            <ProductsContainer products={savedProducts} column />
          </>
        )
        : <EmptyCart
            title="Sevimli mahsulotlar yo'q :("
            subtitle="Hoziroq talang!"
          />
      }

    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
  const cookieOptions = { req, res };
  const prdIds = checkCookies("savedPrds", cookieOptions) ? JSON.parse(getCookie("savedPrds", cookieOptions)) : [];
  const products = await getProductsById(prdIds);

  store.dispatch(addItems(["savedProducts", products]));
});
