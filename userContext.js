import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, res => {
      setUser(res || null);
      setError("");
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const registerUser = (email, password, name) => {
    console.log(name)
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then(res => console.log(res))
      .catch(err => {
        console.error("Error!", err);
        setError(err.message)
      })
      .finally(() => setLoading(false));
  }

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(res => console.log(res))
      .catch(err => {
        console.error("Error!", err);
        setError(err.message)
      })
      .finally(() => setLoading(false));
  }

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = email => {
    sendPasswordResetEmail(auth, email)
      .catch(err => setError(err.message))
  };

  const contextValue= {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
