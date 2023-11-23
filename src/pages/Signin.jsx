import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase rounded-lg disabled:opacity-80 hover:opacity-90"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong" : ""}
      </p>
    </div>
  );
}

export default Signin;
