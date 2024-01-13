import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch } from "react-redux";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";

import { login } from "./features/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (!fName) {
      return alert("Please enter a first name");
    }

    if (!lName) {
      return alert("please enter a last name");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // Set displayName during creation
        return updateProfile(userAuth.user, {
          displayName: fName,
        }).then(() => userAuth);
      })
      .then((userAuth) => {
        console.log(userAuth.user); // Log the userAuth.user object
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: fName,
          })
        );
        navigate("/teslaaccount");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="signup">
        <div className="signup__header">
          <div className="signup__logo">
            <Link>
              <img
                src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
                alt=""
              />
            </Link>
          </div>
          <div className="signup__language">
            <LanguageIcon /> <span>en-US</span>
          </div>
        </div>
        <div className="signup__info">
          <h1>Create account</h1>
          <form autoComplete="on" className="signup__form">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              id="fName"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />

            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              id="lName"
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ButtonPrimary
              name="Create Account"
              type="submit"
              onClick={signUp}
            />
          </form>
          <div className="signup__divider">
            <hr /> <span>OR</span>
            <hr />
          </div>
          <Link to="/login">
            <ButtonSecondary name="Sign In" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
