import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const pwdRef = useRef();
  const { registerUser } = useUserContext();

  const handleSubmit = e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = pwdRef.current.value;
  
    if (email && password && name) registerUser(email, password, name)
  }

  return (
    <div className="form">
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={pwdRef} />
        <button>Register</button>
      </form>
    </div>
  );
}
