import { DesktopProductPage, MobileProductPage } from 'containers';
import { getProductDetails } from 'data/graphql';
import { useState } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip';
import { useSelector } from 'react-redux';
import { addProduct } from 'redux/slices/product';
import { wrapper } from 'redux/store';

export default function ProductPage() {
  const { image } = useSelector(state => state.product);
  const [mainImgs, setMainImgs] = useState(image)
  const [isVisible, setIsVisible] = useState(false);

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
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

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const product = await getProductDetails(context.params.productSlug[0]);

  if (!product?.slug)
    return {
      notFound: true
    };

  store.dispatch(addProduct(product));
});
