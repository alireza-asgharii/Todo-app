import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (isDark) => {
  if (isDark) {
    toast.dark("Please enter something", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.warn("Please enter something", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export { notify };
