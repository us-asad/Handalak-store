import { DesktopProductPage, MobileProductPage } from 'containers';
import { getProductDetails } from 'data/graphql';
import { useState } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip';

export default function ProductPage({ product }) {
  const { discount, image, price: totlaPrice } = product;
  const [mainImgs, setMainImgs] = useState(image)
  const [isVisible, setIsVisible] = useState(false);

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: 'hover',
    placement: 'top',
    closeOnOutsideClick: false,
    visible: isVisible
  });

  const propsOfChildren = {
    mainImgs,
    setMainImgs,
    isVisible,
    setIsVisible,
    product,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef
  }

  return (
    <div className='custom-container mx-auto mb-28'>
      <div className='hidden md:block'>
        <DesktopProductPage {...propsOfChildren} />
      </div>
      <div className='md:hidden'>
        <MobileProductPage {...propsOfChildren} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const product = await getProductDetails(context.params.productSlug[0]);

  if (!product?.slug)
    return {
      notFound: true
    };

  return {
    props: { product }
  };
}

