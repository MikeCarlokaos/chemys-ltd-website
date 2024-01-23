import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMailerState = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    company: "",
    organisation: "",
    enquiry: "",
  };

  const [mailerState, setMailerState] = useState(initialMailerState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const resetForm = () => {
    setMailerState(initialMailerState);
    setErrors({});
    setIsSubmitting(false);
    setSubmitError("");
  };

  const handleStateChange = (e) => {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  useEffect(() => {
    if (location.state?.shortageData) {
      setMailerState((prevState) => ({
        ...prevState,
        enquiry:
          `Shortage: ${location.state.shortageData.name}\n` +
          `Alternative: ${location.state.shortageData.alternatives}\n` +
          `Form: ${location.state.shortageData.form}\n` +
          `Pack Size: ${location.state.shortageData.packSize}\n\n ` +
          `Enquiry: `,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const handleSuccess = () => {
      resetForm();
    };

    window.addEventListener("formSubmissionSuccess", handleSuccess);

    return () => {
      window.removeEventListener("formSubmissionSuccess", handleSuccess);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!mailerState.fname.trim()) {
      newErrors.fname = "First Name is required";
    }

    if (!mailerState.lname.trim()) {
      newErrors.lname = "Last Name is required";
    }

    if (!mailerState.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (!mailerState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mailerState.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!mailerState.company.trim()) {
      newErrors.company = "Company Name is required";
    }

    if (!mailerState.organisation) {
      newErrors.organisation = "Organisation is required";
    }

    if (!mailerState.enquiry.trim()) {
      newErrors.enquiry = "Enquiry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitEmail = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);

        const response = await axios.post(
          import.meta.env.VITE_API_NODEMAILER,
          mailerState
        );

        const resData = response.data;

        if (resData.status === "success") {
          const successEvent = new Event("formSubmissionSuccess");
          window.dispatchEvent(successEvent);
          navigate("/thank-you");
        } else if (resData.status === "fail") {
          setSubmitError("Message failed to send. Please try again.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setSubmitError("An error occurred while sending the message.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section
      id="contact-form-section"
      className="w-full h-full"
      role="region"
      aria-labelledby="contact-form-heading"
    >
      <div className="w-full h-full flex items-center justify-center p-5 md:p-20">
        <form
          onSubmit={submitEmail}
          className="w-full h-full flex flex-col px-5 py-10 bg-blue-200 gap-10 text-lg text-black font-semibold capitalize [box-shadow:1px_0px_15px_8px_rgba(0,0,0,0.15)] rounded-3xl border-2 border-primary/30 md:w-[60rem] md:px-10"
          method="POST"
          aria-labelledby="contact-form-heading"
        >
          {/* Heading */}
          <h2 id="contact-form-heading" className="sr-only">
            Contact Form
          </h2>

          {/* name */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            {/* fname */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="fname">First Name *</label>
              <input
                type="text"
                name="fname"
                id="fname"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.fname}
                onChange={handleStateChange}
              />
              {errors.fname && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.fname}
                </span>
              )}
            </div>

            {/* lname */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="lname">Last Name *</label>
              <input
                type="text"
                name="lname"
                id="lname"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.lname}
                onChange={handleStateChange}
              />
              {errors.lname && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.lname}
                </span>
              )}
            </div>
          </div>

          {/* phone/email */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            {/* phone */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="phone">Phone No. *</label>
              <input
                type="text"
                name="phone"
                id="phone"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.phone}
                onChange={handleStateChange}
              />
              {errors.phone && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* email */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                name="email"
                id="email"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.email}
                onChange={handleStateChange}
              />
              {errors.email && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* company */}
          <div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                name="company"
                id="company"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.company}
                onChange={handleStateChange}
              />
              {errors.company && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.company}
                </span>
              )}
            </div>
          </div>

          {/* organisation */}
          <div className="relative w-full flex flex-col gap-2">
            <label htmlFor="organisation">Organisation *</label>
            <select
              name="organisation"
              id="organisation"
              aria-required="true"
              className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
              value={mailerState.organisation}
              onChange={handleStateChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Hospital">Hospital</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Other">Other</option>
            </select>
            {errors.organisation && (
              <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                {errors.organisation}
              </span>
            )}
          </div>

          {/* enquiry */}
          <div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="enquiry">Enquiry *</label>
              <textarea
                name="enquiry"
                id="enquiry"
                cols="30"
                rows="10"
                aria-required="true"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.enquiry}
                onChange={handleStateChange}
              />
              {errors.enquiry && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.enquiry}
                </span>
              )}
            </div>
          </div>

          {/* submit */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-primary text-white px-8 py-2 rounded-3xl uppercase ease-in-out duration-300 hover:bg-tertiary active:bg-black relative ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  Submitting
                  <span className="h-1 w-1 mx-1.5 bg-white rounded-full animate-ping"></span>
                  <span className="h-1 w-1 mx-1.5 bg-white rounded-full animate-ping [animation-delay:0.3s]"></span>
                  <span className="h-1 w-1 mx-1.5 bg-white rounded-full animate-ping [animation-delay:0.7s]"></span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {submitError && (
            <div className="text-red-500 text-center mt-2">{submitError}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Form;
