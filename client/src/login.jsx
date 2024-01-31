import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./sign-up.css";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };  return (
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
        <section className="signin-container">
          <div className="signup-data">
            <h3 className="signup-heading">Log In</h3>
            <form onSubmit={handleSubmit}>
              <p>
                New User?
                <span>
                  <NavLink to="/"> Sign-up</NavLink>
                </span>
              </p>
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
              <input
                className="input-submit"
                type="submit"
                // onClick={addData}
                value="Submit"
              />
            </form>
          </div>
        </section>
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
    </>
  );
}
export default Login;
