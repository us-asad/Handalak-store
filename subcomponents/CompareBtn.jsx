import { main_color } from 'data';
import { useDispatch, useSelector } from 'react-redux';
import { changeStoredProductState } from 'redux/slices/storeProduct';
import { ChartIcon } from './Icons'

export default function CompareBtn({ color, className, id }) {
  const dispatch = useDispatch();
  const { comparedPrds } = useSelector(state => state.storeProduct);
  
  return (
    <button
      onClick={() => dispatch(changeStoredProductState(["comparedPrds", id]))}
      className={`relative ${className || ""}`}
    >
      <ChartIcon color={comparedPrds.includes(id) ? main_color : color || "#fff"} />
    </button>
  )
}
