import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Switch from "react-switch";
import axios from "axios";
import { nanoid } from "nanoid";

const ConsentBanner = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  // Generate a unique user ID using nanoid
  const userId = localStorage.getItem("userId") || nanoid();
  localStorage.setItem("userId", userId);

  const cookieTypes = {
    necessary: {
      label: "Necessary Cookies",
      description:
        "These cookies are essential for the basic functionality of the website.",
    },
    analytics: {
      label: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with the website.",
    },
    marketing: {
      label: "Marketing Cookies",
      description: "These cookies are used to track visitors across websites.",
    },
  };

  const defaultCookies = {
    necessary: true,
    analytics: false,
    marketing: false,
  };

  const [enabledCookies, setEnabledCookies] = useState(defaultCookies);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("visited");

    if (isFirstVisit) {
      setShowBanner(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const handleAccept = async () => {
    try {
      setCookie("cookieConsent", enabledCookies, {
        path: "/",
        maxAge: 31536000,
      });

      // Send a request to store the user's consent data in the database
      await axios.post(import.meta.env.VITE_API_CONSENT, {
        userId,
        cookiePreferences: enabledCookies,
      });

      setEnabledCookies({
        necessary: true,
        analytics: true,
        marketing: true,
      });
      setShowBanner(false);
    } catch (error) {
      // Handle the error (e.g., log it, show a user-friendly message)
      console.error("Error during consent handling:", error);
    }
  };

  const handleReject = async () => {
    try {
      setCookie(
        "cookieConsent",
        { necessary: true, analytics: false, marketing: false },
        { path: "/", maxAge: 31536000 }
      );

      // Send a request to store the user's rejected consent data in the database
      await axios.post(import.meta.env.VITE_API_CONSENT, {
        userId,
        cookiePreferences: {
          necessary: true,
          analytics: false,
          marketing: false,
        },
      });

      setEnabledCookies({
        necessary: true,
        analytics: false,
        marketing: false,
      });
      setShowBanner(false);
      // Additional logic for handling rejected cookies if needed
    } catch (error) {
      // Handle the error (e.g., log it, show a user-friendly message)
      console.error("Error during rejection handling:", error);
    }
  };

  const handleToggleNecessary = () => {
    setEnabledCookies((prevCookies) => ({
      ...prevCookies,
      necessary: !prevCookies.necessary,
    }));
  };

  const handleToggleAnalytics = () => {
    setEnabledCookies((prevCookies) => ({
      ...prevCookies,
      analytics: !prevCookies.analytics,
    }));
  };

  const handleToggleMarketing = () => {
    setEnabledCookies((prevCookies) => ({
      ...prevCookies,
      marketing: !prevCookies.marketing,
    }));
  };

  const handleToggleCookie = (type) => {
    if (type === "necessary") {
      handleToggleNecessary();
    } else if (type === "analytics") {
      handleToggleAnalytics();
    } else if (type === "marketing") {
      handleToggleMarketing();
    }
  };

  const handleHideCustomize = () => {
    setShowCustomize(false);
  };

  const handleSavePreferences = async () => {
    setCookie("cookieConsent", enabledCookies, { path: "/", maxAge: 31536000 });

    // Send a request to store the user's consent data in the database

    await axios.post(import.meta.env.VITE_API_CONSENT, {
      userId,
      cookiePreferences: enabledCookies,
    });

    setShowBanner(false);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <div>
      {showBanner && (
        <div className="fixed bottom-0 w-full bg-white border-2 p-5 rounded-lg shadow-md md:w-[30rem] md:bottom-4 md:left-4">
          <div className="relative w-full">
            <div className="flex flex-col w-full justify-center items-center">
              <h2 className="self-start font-bold">We use cookies</h2>
              <p className="text-sm text-justify text-gray-700">
                We use cookies to enhance your experience. By continuing to
                visit this site, you agree to our use of cookies.{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="mt-4">
              {showCustomize && (
                <>
                  {Object.keys(cookieTypes).map((type) => (
                    <div key={type} className="flex items-center mb-2">
                      <Switch
                        onChange={() => handleToggleCookie(type)}
                        checked={enabledCookies[type]}
                        id={type}
                        height={20}
                        width={40}
                        onColor="#4CAF50"
                        offColor="#ccc"
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                      <div className="ml-3">
                        <label htmlFor={type} className="block font-semibold">
                          {cookieTypes[type].label}
                        </label>
                        <p className="text-sm text-gray-500">
                          {cookieTypes[type].description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between mt-2">
                    <button
                      className="w-44 border-2 border-green-400 px-4 py-1.5 rounded hover:bg-green-400 hover:text-white"
                      onClick={handleAccept}
                    >
                      Accept All
                    </button>
                    <button
                      className="w-44 border-2 border-blue-400 px-4 py-1.5 rounded hover:bg-blue-400 hover:text-white"
                      onClick={handleSavePreferences}
                    >
                      Save Preferences
                    </button>
                    <button
                      className="border-2 border-blue-400 px-4 py-1.5 rounded hover:bg-blue-400 hover:text-white"
                      onClick={handleHideCustomize}
                    >
                      Hide
                    </button>
                  </div>
                </>
              )}
              {!showCustomize && (
                <div className="flex w-full justify-between gap-5">
                  <button
                    className="w-36 border-2 border-blue-400 px-4 py-1.5 rounded hover:bg-blue-400 hover:text-white"
                    onClick={() => setShowCustomize(true)}
                  >
                    Customize
                  </button>
                  <button
                    className="w-36 border-2 border-green-400 px-4 py-1.5 rounded hover:bg-green-400 hover:text-white"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                  <button
                    className="w-36 border-2 border-red-400 px-4 py-1.5 rounded hover:bg-red-400 hover:text-white"
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <div className="absolute -top-5 -right-5">
              <button
                className="text-gray-400 border rounded hover:text-red-600 hover:border-slate-400"
                onClick={handleCloseBanner}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {!showBanner && (
        <div
          className="fixed bottom-10 left-10 bg-gray-900/50 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800"
          onClick={() => setShowBanner(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ConsentBanner;
