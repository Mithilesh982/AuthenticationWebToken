import React ,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css";
import axios from 'axios'

function Login() {

    const navigate = useNavigate()

    const[mail,setMail] = useState("")    
    const[password,setPassword] = useState("")    


    const Authenticate= ()=>{
        axios.post("http://localhost:4001/authentication" , {
            mail,
            password
        }).then((response)=>{
            if(response){
                localStorage.setItem("token", response.data.token);
                navigate('/home')
            }
        })
    }

  return (
    <>
      <div className="container-fluid px-5 pb-5 pt-0 m-0 overflow-hidden login-main-container">
        <div className="row m-0 w-100 d-flex justify-content-center">
          <div className="col-4 login-box px-5 pb-5 pt-0 text-center ">
            <div className=" profileBox text-center  mb-5">

                <div className="signInBox d-flex justify-content-center" ><h3 className="border"> SIGN IN </h3></div>
                <div className="d-flex justify-content-center profile_icon"><i class=" fa-solid fa-user"></i></div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e)=>{setMail(e.target.value)}}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}

              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="btn btn-outline-primary my-4" onClick={Authenticate}>Login</div>
            <div className="">
              <h6 className="">
                Don't have an Account ?{" "}
               <Link to="/register"> <span className="text-primary">Register</span> </Link> here
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
