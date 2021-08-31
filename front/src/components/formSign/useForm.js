import { useState, useEffect } from "react";
import UserDataService from "../../services/user.service";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstName: "",
    surename: "",
    email: "",
    password: "",
    password2: "",
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
    console.log("bbbbmxbb");
    if (Object.keys(errors).length === 0 && isSubmitting) {
      UserDataService.create(values)
        .then((response) => {
          this.setState({
            id: response.values.id,
            firstName: response.values.firstName,
            surename: response.values.surename,
            email: response.values.email,
            password: response.values.password,

            submitted: true,
          });
          console.log(response.values);
        })
        .catch((e) => {
          console.log(e);
        });
      window.location.replace("http://localhost:8083/login");
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
