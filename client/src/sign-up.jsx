import React, { useState } from "react";
import "./sign-up.css";
// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Imgage2 from "./Rectangle 2.jpg";
// import { Button } from "@mui/material";
// import Header from "../header";
// import image1 from "../sign-up/Rectangle 2.jpg"
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function Signup() 
{
  const [name,setName] =  useState("")  
  const [email,setEmail] =  useState("")
  const [password,setPassword] =  useState("")
  const [phone,setPhone] =  useState("")
  const [address,setAddress] =  useState("")
  const navigate = useNavigate();
  // form function
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        // toast.success(res.data && res.data.message);
        alert(res.data && res.data.message);
        navigate("/login");
      } else {
        // toast.error(res.data.message);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
      alert("Something went wrong");
    }
    // console.log(process.evn.REACT_APP_API)
  };

  return (
    <>
      <div className="signup-page">
        <svg
          className="left-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <path
            d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z"
            fill="black"
          />
        </svg>
        <section className="signin-container ">
          <div className="signup-data">
            <h3 className="signup-heading">Create a new account .</h3>
            <p className="login-link">
              Already Have an Account{" "}
              <span>
                <NavLink to="/login">Sign-in</NavLink>
              </span>
            </p>
            <form onSubmit={handleSubmit}> 
              <label>
                <input
                  className="input-name"
                  type="text"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  name="name"
                //   onChange={getdata}
                  placeholder="Enter name"
                  required
                  autoFocus
                />
              </label>
              <label>
                <input
                  className="inputemail"
                  type="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}

                  name="email"
                //   onChange={getdata}
                  placeholder="Enter Email"
                  required

                />
              </label>
              <label>
                <input
                  className="input-password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}

                  name="password"
                //   onChange={getdata}
                  placeholder="password"
                  required

                />
              </label>
              <label>
                <input
                  className="input-date"
                  type="phone"
                  value={phone}
                  onChange={(e)=> setPhone(e.target.value)}
                  required
                  name="phone"
                //   onChange={getdata}
                  placeholder="phone"
                />
              </label>
              <label>
                <input
                  className="inputemail"
                  type="text"
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  name="address"
                //   onChange={getdata}
                  placeholder="address"
                  required

                />
              </label>
              <input
                className="input-submit"
                type="submit"
                // onClick={addData}
                value="Create account"
              />
              {/* <Button className="btn" variant="contained">submit</Button> */}
            </form>
          </div>
        </section>
        {/* <div className="right_data"> */}
        <svg
          className="right-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
        >
          <path
            d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
            fill="black"
          />
        </svg>
      </div>
      {/* </div> */}
    </>
  );
}
export default Signup;
