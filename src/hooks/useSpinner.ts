import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from 'src/redux/spinner/spinnerType';

const useSpinner = () => {
  const dispatch = useDispatch();

  const startLoading = (message?: string) => {
    dispatch({ type: SHOW_SPINNER, message });
  };

  const hideLoading = () => {
    dispatch({ type: HIDE_SPINNER });
  };

  return {
    startLoading,
    hideLoading,
  };
};

export default useSpinner;
