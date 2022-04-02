import React from "react";
import HomeSVG from "./../Assets/homeSVG.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";
import { useEffect } from "react";
function Home() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const emailInputRef = React.useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const navigate = useNavigate();

  let checkIsEmail = (email) => {
    if (email.length === 0) {
      setEmailError(false);
      setPasswordError(false);
      return;
    }
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setEmailError(false);
      setPasswordError(false);
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

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/v1/signup`, requestOptions)
      .then((response) => {})
      .then((result) => {
        if (result.status === 200) {
          navigate("/projects", { state: { name: fullName } });
        }
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
      .then((result) => {
        navigate("/projects", { state: { name: result.data.user.name } });
      })
      .catch((err) => {
        setEmailError(true);
        setPasswordError(true);
      });
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
            <hr />
          </span>
          <span
            onClick={() => setIsLogin(false)}
            className={`${!isLogin ? "active" : "inactive"}`}
          >
            Sign up
            <hr />
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
                  ref={emailInputRef}
                  onChange={(e) => {
                    checkIsEmail(e.target.value);
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div
                className={`home__right--bottom--input ${
                  passwordError ? "emailInputError" : ""
                }`}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setEmailError(false);
                    setPasswordError(false);
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                {/* <VisibilityOff /> */}
              </div>
              <div
                className={
                  emailError && !passwordError ? "emailError" : "noError"
                }
              >
                {" "}
                <ErrorOutline
                  style={{
                    color: "#F65B2A",
                    fontSize: "15px",
                    marginRight: "5px",
                  }}
                />
                Please Enter a valid Email
              </div>
              <div
                className={
                  emailError && passwordError ? "emailError" : "noError"
                }
              >
                {" "}
                <ErrorOutline
                  style={{
                    color: "#F65B2A",
                    fontSize: "15px",
                    marginRight: "5px",
                  }}
                />
                Your Email & Password do not match
              </div>
              <button
                onClick={() => {
                  handleLogin();
                }}
              >
                Log In
              </button>
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
                <ErrorOutline
                  style={{
                    color: "#F65B2A",
                    fontSize: "15px",
                    marginRight: "5px",
                  }}
                />
                Please Enter a valid Email
              </div>
              <button
                onClick={() => {
                  handleSignup();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
