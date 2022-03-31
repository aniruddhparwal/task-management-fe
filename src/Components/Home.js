import React from "react";
import HomeSVG from "./../Assets/homeSVG.svg";
function Home() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [emailError, setEmailError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

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
              <button>Log In</button>
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
              <button>Log In</button>
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
