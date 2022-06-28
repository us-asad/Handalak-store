import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDynamicModal } from 'redux/slices/toggleModal';
import ModalContainer from 'subcomponents/ModalContainer';

export default function PreOrderModal() {
  const { preOrder } = useSelector(state => state);
  const dispatch = useDispatch();
  const formRef = useRef();

  return (
    <ModalContainer
      state={preOrder.state}
      zIndex={52}
      closeEvent={() => dispatch(toggleDynamicModal(["preOrder", false]))}
    >
      <h3>Oldindan Buyurtma qiling!</h3>
      <form
        ref={formRef}
      >
        
      </form>
    </ModalContainer>
  )
}
