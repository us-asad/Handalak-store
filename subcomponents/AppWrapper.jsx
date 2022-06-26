import { useDispatch } from "react-redux";
import { addCategories } from "redux/slices/main";

export default function AppWrapper({ children, categories }) {
  const dispatch = useDispatch();
  dispatch(addCategories(categories));

  return (
    <>
      {children}
    </>
  );
}