import {useEffect, useRef} from "react";

export const EditMenu = () => {
  const ref = useRef(null);

  useEffect(() => {
    const closePopup = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        ref.current.style.display = "none";
      }
    };

    document.addEventListener("mousedown", closePopup);
  }, []);

  return (
    <>
      <div className="bg-wolf w-20 h-10"
           ref={ref}
      >
        adsasd
      </div>
    </>
  );
}
