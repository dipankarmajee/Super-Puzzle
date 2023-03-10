import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { InfinitySpin } from "react-loader-spinner";
// import { Redirect } from "react-router-dom";

// import Cookies from "js-cookie";

import "./index.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("signup");
  const [loaderStatus, setLoaderStatus] = useState(false);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();
    setLoaderStatus((prev) => !prev);
    setErrorMsg("");
    console.log(name, username, password);
    if (activeTab === "signup") {
      localStorage.setItem("name", name);
      const templateParams = {
        name: name,
        email: username,
      };

      emailjs
        .send(
          "service_7yae8tr",
          "template_2w6lioc",
          templateParams,
          "zHUtqiQv4EDC0RCn1"
        )
        .then(
          (result) => {
            console.log(result.text);
            setErrorMsg("Please check your email for the credentails.");
            setLoaderStatus((prev) => !prev);
          },
          (error) => {
            console.log(error.text);
            setErrorMsg(error.text);
            setLoaderStatus((prev) => !prev);
          }
        );
    } else if (activeTab === "login") {
      const credentails = {
        username: "dipankar_super_puzzle",
        password: "puzzle_super_dipankar",
      };

      if (
        username === credentails.username &&
        password === credentails.password
      ) {
        console.log(props);
        // props.history.replace("/super-puzzle");
        navigate("/super-puzzle", { replace: true });
      } else {
        setErrorMsg("Please check your username and password");
      }
    }
  };

  const onClickActiveTab = (value) => {
    setActiveTab(value);
    setName("");
    setPassword("");
    setUsername("");
    setErrorMsg("");
  };

  useEffect(() => {
    setErrorMsg("");
  }, [activeTab]);

  //   const onSubmitFailure = (errorResponse) => {
  //     this.setState({ errorMsg: errorResponse });
  //   };

  return (
    <div className="login-bg-container">
      <div className="tab-container">
        <button
          type="button"
          className={`${
            activeTab === "signup" ? "active-tab" : "non-active-tab"
          }`}
          onClick={() => onClickActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          type="button"
          className={`${
            activeTab === "login" ? "active-tab" : "non-active-tab"
          }`}
          onClick={() => onClickActiveTab("login")}
        >
          Login
        </button>
      </div>
      <form className="login-card" onSubmit={onSubmitLogin}>
        {activeTab === "signup" && (
          <label>
            NAME
            <input
              type="text"
              value={name}
              className="input-element"
              onChange={onChangeName}
              placeholder="Name"
            />
          </label>
        )}

        <label>
          {activeTab === "signup" ? "EMAIL" : "USERNAME"}
          <input
            type="text"
            value={username}
            className="input-element"
            onChange={onChangeUsername}
            placeholder={activeTab === "signup" ? "Email" : "Username"}
          />
        </label>
        {activeTab === "login" && (
          <label>
            PASSWORD
            <input
              type={activeTab === "login" ? "password" : "text"}
              value={password}
              className="input-element"
              onChange={onChangePassword}
              placeholder="Password"
            />
          </label>
        )}

        {activeTab === "signup" &&
          (loaderStatus ? (
            <InfinitySpin width="200" color="#fff" />
          ) : (
            <button className="login-button" type="submit">
              Sign Up{" "}
            </button>
          ))}

        {activeTab === "login" && (
          <button className="login-button" type="submit">
            Login
          </button>
        )}

        {errorMsg !== "" && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
