import {useEffect, useRef} from "react";

export const EditMenu = ({onClose}) => {
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (ref.current &&!ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className="bg-wolf w-20 h-10">
        adsasd
      </div>
    </>
  );
}
