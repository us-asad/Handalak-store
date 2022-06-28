import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "redux/slices/toggleModal";
import { ModalContainer } from "subcomponents";
import Auth from "./Auth";


export default function LoginModal() {
  const { loginModal } = useSelector(state => state.toggleModal);
  const dispatch = useDispatch();

  return (
    <ModalContainer
      state={loginModal}
      zIndex={54}
      closeEvent={() => dispatch(toggleModal(["loginModal", false]))}
      className="fixed max-h-screen min-w-[30vw] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto flex flex-col bg-white h-max z-[55] py-16 px-12 space-y-4"
    >
      <Auth />
    </ModalContainer>
  );
}
