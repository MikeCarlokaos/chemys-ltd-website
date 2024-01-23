import React, { useEffect } from "react";
import heroBg from "../../../assets/images/warehouse-3.jpg";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const ShortageHero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section aria-labelledby="shortage-hero-heading" className="pt-36">
      <div className="w-full h-full bg-black/30">
        <div
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full flex flex-col items-start justify-center p-5 bg-slate-100 md:p-10"
        >
          <div
            data-aos="fade-right"
            className="py-5 md:px-16 bg-white/50 rounded-2xl"
          >
            <div className="flex justify-start">
              <h1
                id="shortage-hero-heading"
                className="text-4xl font-bold py-5 px-3 md:text-5xl"
              >
                UK Shortages
              </h1>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-lg font-semibold py-5 px-3 ">
                The UK drug shortages table is for the support of UK healthcare
                professionals only. It provides a regularly updated, fully
                comprehensive UK drug shortage list and highlights the existing
                alternative available. By reviewing the content below you are
                confirming you are a UK healthcare professional.
              </p>
              <p className="text-lg font-semibold py-5 px-3 ">
                Although Chemys has performed an alternative assessment of these
                products, please note, it is the prescriber's responsibility to
                ensure that the product is suitable for their patient.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <div className="group">
                <Link
                  to="/contact"
                  className="flex items-center text-xl text-white bg-primary py-3 px-6 rounded-3xl ease-in-out duration-500 group-hover:bg-tertiary active:bg-secondary"
                >
                  Enquire
                  <span>
                    <img
                      src={arrowRight}
                      alt="arrow"
                      className="w-0 h-5 invert ease-in-out duration-500 group-hover:w-10"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortageHero;
