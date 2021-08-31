export default function validateInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 3) {
    errors.password = "Password needs to be 3 characters or more";
  }

  if (!values.firstName.trim()) {
    errors.firstName = "First name required";
  }

  if (!values.surename.trim()) {
    errors.surename = "Last name required";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
}
