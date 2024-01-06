// ConsentBanner.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Switch from "react-switch";
import axios from "axios";

const ConsentBanner = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [enabledCookies, setEnabledCookies] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

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

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("visited");

    if (isFirstVisit) {
      setShowBanner(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const handleConsent = () => {
    setCookie("cookieConsent", enabledCookies, { path: "/", maxAge: 31536000 });
    setEnabledCookies({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setShowBanner(false);
    sendToServer("accept");
  };

  const handleReject = () => {
    setCookie(
      "cookieConsent",
      { necessary: true, analytics: false, marketing: false },
      { path: "/", maxAge: 31536000 }
    );
    setEnabledCookies({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setShowBanner(false);
    sendToServer("reject");
    // Additional logic for handling rejected cookies if needed
  };

  const sendToServer = (action) => {
    const data = { userIdentifier: "unique_user_id", action, enabledCookies };

    axios;
    axios
      // .post("http://localhost:3001/api/auth/cookieconsent", data)
      .post(
        "https://chemys-website-api.onrender.com/api/auth/cookieconsent",
        data
      )
      .then((response) => {
        console.log("Counts sent to the server:", response.data);
      })
      .catch((error) => {
        console.error("Error sending counts to the server:", error);
      });
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
    if (type === "necessary") handleToggleNecessary();
    else if (type === "analytics") handleToggleAnalytics();
    else if (type === "marketing") handleToggleMarketing();
  };

  const handleHideCustomize = () => {
    setShowCustomize(false);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <div>
      {showBanner && (
        <div className="fixed z-40 bottom-4 left-4 w-96 bg-white border-2 p-5 rounded-lg shadow-md">
          <div className="relative w-full">
            <div className="flex w-full justify-center items-center">
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
                  <div className="flex justify-end mt-2">
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
                <div className="flex w-full gap-5">
                  <button
                    className="w-28 border-2 border-blue-400 px-4 py-1.5 rounded hover:bg-blue-400 hover:text-white"
                    onClick={() => setShowCustomize(true)}
                  >
                    Customize
                  </button>
                  <button
                    className="w-28 border-2 border-green-400 px-4 py-1.5 rounded hover:bg-green-400 hover:text-white"
                    onClick={handleConsent}
                  >
                    Accept
                  </button>
                  <button
                    className="w-28 border-2 border-red-400 px-4 py-1.5 rounded hover:bg-red-400 hover:text-white"
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <div className="absolute -top-5 -right-5">
              <button
                className="text-gray-400 border rounded hover:text-blue-600 hover:border-blue-600"
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
          className="fixed z-40 bottom-10 left-10 bg-gray-900/50 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800"
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
