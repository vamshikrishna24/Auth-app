import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Error with login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-80 "
    >
      Continue with Google Login
    </button>
  );
}

export default OAuth;
