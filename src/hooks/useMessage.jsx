import { useDispatch } from "react-redux";

import { setMessage } from "../features/message/messageSlice";

const useMessage = () => {
  const dispatch = useDispatch();

  const showMessage = (options) => {
    if (!options.autoHideDuration) {
      options.autoHideDuration = 3000;
    }

    if (!options.severity) {
      options.severity = "success";
    }

    if (!options.vertical) {
      options.vertical = "top";
    }

    if (!options.horizontal) {
      options.horizontal = "center";
    }

    if (!options.title) {
      options.title = "Зверніть увагу!";
    }

    options.open = true;

    dispatch(setMessage(options));
  };

  return showMessage;
};

export default useMessage;
