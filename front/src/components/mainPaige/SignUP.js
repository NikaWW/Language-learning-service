import React, { useState } from "react";
import FormSignUp from "../formSign/FormSignUp";
import Footer from "../other/footer";
import Navbar from "../other/navbar";
import "../../App.css";
import SignIn from "./SignIn";
import Profile from "../user/profile";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      {!isSubmitted ? (
        <React.Fragment>
          <Navbar />
          <div className="form-container">
            <div className="form-content-left">
              <img className="form-img" alt="SING UP" src="image1.png" />
            </div>
            <FormSignUp submitForm={submitForm} />
          </div>
          <Footer />
        </React.Fragment>
      ) : (
        <Profile />
      )}
    </>
  );
};

export default SignUp;
