import React from "react";
import Navbar from "../../features/Navbar";
import Footer from "../../features/Footer";
import ChangeTitle from "../../components/hooks/ChangeTitle";
import ShortageHero from "../../features/Shortage/ShortageHero";
import ShortageList from "../../features/Shortage/ShortageList";

const Shortage = () => {
  ChangeTitle("Shortage | Chemys Limited | United Kingdom");

  return (
    <div className="md:relative">
      <header className="fixed z-30 top-0 w-full md:absolute">
        <Navbar />
      </header>
      <main>
        <ShortageHero />
        <ShortageList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Shortage;
