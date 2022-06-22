import React, { useRef } from 'react';
import { useUserContext } from '../context/userContext';

export default function Signin() {
  const emailRef = useRef();
  const pwdRef = useRef();

  const {signInUser, forgotPassword} = useUserContext();

  const submitHandler = e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pwd = pwdRef.current.value;

    if (email && pwd) signInUser(email, pwd);
  }

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;

    if (email) forgotPassword(email)
  }

  return (
    <div className='form'>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder='Email' ref={emailRef} />
        <input type="password" placeholder='Password' ref={pwdRef} />
        <button>Sign In</button>
        <p onClick={forgotPasswordHandler}>Forgot Password</p>
      </form>
    </div>
  )
}
