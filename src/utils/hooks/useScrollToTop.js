import { useEffect } from "react";

const useScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

export default useScrollToTopOnMount;
