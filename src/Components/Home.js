import React from "react";
import HomeSVG from "./../Assets/homeSVG.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [emailError, setEmailError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const navigate = useNavigate();

  let checkIsEmail = (email) => {
    if (email.length === 0) {
      setEmailError(false);
      return;
    }
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleSignup = () => {
    if (emailError) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: fullName,
      email: email,
      password: password,
    });

    console.log("dd", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/v1/signup`, requestOptions)
      .then((response) => console.log("res ", response))
      .then((result) => {
        if (process.env.NODE_ENV === "production") {
          cookies.set("token", response.data.token, options);
          localStorage.setItem("token", response.data.token);
        }
        navigate("/projects");
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleLogin = () => {
    if (emailError || password.length === 0 || email.length === 0) {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("dsdsd", res);
        navigate("/projects");
      })
      .catch((err) => {});
  };

  return (
    <div className="home">
      <div className="home__left">
        <img src={HomeSVG} />
      </div>
      <div className="home__right">
        <div className="home__right--top">
          <span
            onClick={() => setIsLogin(true)}
            className={`${isLogin ? "active" : "inactive"}`}
          >
            Log In
          </span>
          <span
            onClick={() => setIsLogin(false)}
            className={`${!isLogin ? "active" : "inactive"}`}
          >
            Sign up
          </span>
        </div>
        <div className="home__right--bottom">
          {isLogin ? (
            <div className="home__right--bottom--login">
              <div className="spanText">To Continue</div>
              <div className="spanText">We need your Name & Email </div>
              <div
                className={`home__right--bottom--input ${
                  emailError ? "emailInputError" : ""
                }`}
              >
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    checkIsEmail(e.target.value);
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div className="home__right--bottom--input">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* <VisibilityOff /> */}
              </div>
              <div className={emailError ? "emailError" : "noError"}>
                Please Enter a valid Email
              </div>
              <button
                onClick={() => {
                  handleLogin();
                }}
              >
                Log In
              </button>
              <div className="home__right--bottom--checkbox">
                <input type="checkbox" /> <span>Remember me</span>
              </div>
            </div>
          ) : (
            <div className="home__right--bottom--login">
              <div className="home__right--bottom--input">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div
                className={`home__right--bottom--input ${
                  emailError ? "emailInputError" : ""
                }`}
              >
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    checkIsEmail(e.target.value);
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div className="home__right--bottom--input">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* <VisibilityOff /> */}
              </div>
              <div className={emailError ? "emailError" : "noError"}>
                Please Enter a valid Email
              </div>
              <button
                onClick={() => {
                  handleSignup();
                }}
              >
                Sign Up
              </button>
              <div className="home__right--bottom--checkbox">
                <input type="checkbox" /> <span>Remember me</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
