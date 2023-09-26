import { useEffect } from "react";

function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id != exeptionId
      ) {
        cb();
      } else {
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb]);
}

export default useOutsideClick;
