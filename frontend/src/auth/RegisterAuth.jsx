import api from "../config/api";

const RegisterAuth = (
  username,
  userEmail,
  userPassword,
  navigate,
  setUser,
  setUsernameError,
  setUserEmailError,
  setUserPasswordError
) => {
  if (username.trim().length <= 0) {
    setUsernameError(true);
    return;
  } else if (userEmail.trim().length <= 0) {
    setUserEmailError(true);
    return;
  } else if (userPassword.trim().length <= 0) {
    setUserPasswordError(true);
    return;
  }

  let userInput = {
    username: username,
    email: userEmail,
    password: userPassword,
  };

  console.log(userInput);

  fetch(api.REGISTER.getUrl, {
    method: api.REGISTER.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInput),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Authentication failed");
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token); //oder sessionStorage.setItem.....
      console.log("Token saved in localStorage");
      const jwt = data.token;
      setUser(jwt);
      navigate("/logged-in");
    })
    .catch((err) => console.log(`Hey, there is an ${err}`));
};

export default RegisterAuth;
