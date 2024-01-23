import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Shortage from "./pages/Shortage";
import NoPage from "./pages/NoPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/hooks/ScrollToTop";
import ScrollTopButton from "./components/common/ScrollTopButton";
import ThankYou from "./pages/ThankYou";
import ConsentBanner from "./components/common/ConsentBanner";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shortage" element={<Shortage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ScrollToTop />
      <ScrollTopButton />
      <ConsentBanner />
    </div>
  );
}

export default App;
