import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const Register = () => {
    setLoading(true);

    axios
      .post("http://localhost:4001/UserRegistration", {
        userMail,
        userPassword,
        userDOB,
        userName,
      })
      .then((response) => {
        alert(`Hello ${userName}, registration successful!`);

        // Redirect to login page after 1 seconds
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container-fluid px-5 pb-5 pt-0 m-0 overflow-hidden login-main-container">
        <div className="row m-0 w-100 d-flex justify-content-center">
          <div className="col-4 login-box px-5 pb-5 pt-0 text-center ">
            <div className=" profileBox text-center  mb-5">
              <div className="signInBox d-flex justify-content-center">
                <h3 className="border"> SIGN UP </h3>
              </div>
              <div className="d-flex justify-content-center profile_icon">
                <i class=" fa-solid fa-user"></i>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Mithilesh003"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label for="floatingName">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setUserDOB(e.target.value);
                }}
              />
              <label for="floatingInput">Data Of Birth</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setUserMail(e.target.value);
                }}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
              <label for="floatingPassword">Password</label>
            </div>{" "}
            <div className="btn btn-outline-primary my-4" onClick={Register}>
              {loading ? "Registering..." : "Register"}
            </div>
            <div className="">
              <h6 className="">
                Already have an Account ?{" "}
                <Link to="/">
                  {" "}
                  <span className="text-primary">Login</span>{" "}
                </Link>{" "}
                here
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
