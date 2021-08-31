import React from "react";
import "../../App.css";
import { Button } from "./button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <img className="form-imgH" alt="LOGIN" src="image3.png" />
      <h1> Practice languages with native speakers from around the world</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
