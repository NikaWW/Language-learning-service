import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import UserDataService from "../../services/user.service";
import Profile from "../user/profile";

const useFormLogin = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log("isSubmitting");
    console.log(isSubmitting);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      UserDataService.findByEmail(values.email)
        .then((response) => {
          console.log(response.data[0].userId);
          sessionStorage.setItem("userId", response.data[0].userId);
          console.log(sessionStorage.getItem("userId"));
          return (window.location.href = "http://localhost:8083/profile"); //<Redirect to="/home" />; //
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useFormLogin;
