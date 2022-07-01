import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import signupimg from "../images/signup.jpg"
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //save auth token and redirect
      navigate('/', { replace: true });
      // localStorage.setItem("token", json.authToken);
      props.showAlert("Account Created successfully","success");
    }
    else {
      props.showAlert("Invalid Credentials","danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-4 signup-page d-flex'>
      <div className="col-6">
        <h2 >Signup to use Jot.</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} aria-describedby="emailHelp" onChange={onChange} required minLength={2} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required minLength={4} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={4} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" >Submit</button>
        </form>
      </div>
      <div className="col-6 signup-img justify-content-center align-items-center d-flex">
        <img src={signupimg} alt="" />
      </div>
    </div>);
};

export default Signup;
