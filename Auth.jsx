import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const toggleIsLoginPage = () => setIsLoginPage(prev => !prev); 

  return (
    <div className="container">
      {isLoginPage ? <Signin /> : <Signup />}
      <p onClick={toggleIsLoginPage}>{isLoginPage ? "New user? Click here" : "Already have an account?"}</p>
    </div>
  )
}
