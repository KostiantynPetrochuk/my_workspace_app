import { useDispatch } from "react-redux";
import { setLoading } from "../features/loading/loadingSlice";

const useLoading = () => {
  const dispatch = useDispatch();
  const startLoading = () => dispatch(setLoading(true));
  const stopLoading = () => dispatch(setLoading(false));

  return { startLoading, stopLoading };
};

export default useLoading;
