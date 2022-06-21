import React from "react";
import TrainingSection from "../components/Training";
import HeroImage from "../components/HeroImage";
import Navbar from "../components/Navbar";
const Training = () => {
  return (
    <div>
      <Navbar />
      <HeroImage heading="TRAINING." text="Pre-Flight & In Flight Training." />
      <TrainingSection />
    </div>
  );
};

export default Training;
