import React, { useState, useEffect } from "react";
import arrowUp from "../../../assets/icons/arrow-up.svg";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const toggleButton = () => {
    const scrolled = window.scrollY;
    if (scrolled > 400) {
      setShowButton(true);
    } else if (scrolled <= 400) {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleButton);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", toggleButton);
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <button
      onClick={scrollToTop}
      className={`${
        showButton
          ? "fixed bottom-20 right-10 w-10 h-10 bg-black/50 rounded-xl hover:bg-tertiary/80"
          : "hidden"
      }`}
    >
      <img src={arrowUp} alt="arrow up" className="w-full h-full p-2 invert" />
    </button>
  );
};

export default ScrollTopButton;
