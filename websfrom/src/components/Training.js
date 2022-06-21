import React from "react";
import "./TrainingStyles.css";
import { Link } from "react-router-dom";

import Pod from "../assets/pod.jpeg";
import Moon from "../assets/moon.jpeg";

const Training = () => {
  return (
    <div className="training">
      <div className="left">
        <h1>Training</h1>
        <p> Through training is an necessity when traveling to space.</p>
        <Link to="/contact">
          <button className="btn">Contact</button>
        </Link>
      </div>

      <div className=" right">
        <div className="img-container">
          <div className="image-stack top">
            <img src={Moon} className="img" alt=""></img>
            <img src={Pod} className="img" alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
