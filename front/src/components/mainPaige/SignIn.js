import React, { useState } from "react";
import FormLogin from "../formSign/FormLogin";
import Footer from "../other/footer";
import "../../App.css";
import "../formSign/Form.css";
import Navbar from "../other/navbar";
import Profile from "../user/profile";
import Home from "./Home";

const SignIn = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      {!isSubmitted ? (
        <React.Fragment>
          <Navbar />
          <div className="form-container2">
            <div className="form-content-left">
              <img className="form-img" alt="LOGIN" src="image2.png" />
            </div>
            <FormLogin submitForm={submitForm} />
          </div>
          <Footer />
        </React.Fragment>
      ) : (
        <Home />
      )}
    </>
  );
};

export default SignIn;
