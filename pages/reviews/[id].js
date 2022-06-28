import { CommentCard } from 'components';
import { getProductComments } from 'data/graphql';
import React from 'react'

export default function ProductReviews({ product }) {
  return (
    <div className='custom-container mx-auto mt-3 mb-9'>
      <h1 className='text-xl md:text-4xl'>Mahsulot izohlari</h1>
      <div className='grid grid-cols-1 gap-y-6 divide-y'>
        {product?.comments?.map((cmt, i) => <CommentCard key={i} {...cmt} prdId={product?.id} />)}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const product = await getProductComments(context.params.id);

  return {
    props: {
      product
    }
  }
}
