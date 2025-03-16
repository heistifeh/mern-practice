import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcProcess } from "react-icons/fc";
import { useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
const Signin = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        // throw new Error(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      console.log(data, "user data here");
      dispatch(signInSuccess(data));

      navigate("/");

      // res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      dispatch(signInFailure(err.message));
    }
    // console.log("submitted");
  };
  return (
    <div className="bg-slate-200">
      <div className="max-w-lg mx-auto  ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl text-center">SIGN IN</h1>

          <label>email: </label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            className="bg-white outline-none border-o"
          />
          <label>password: </label>
          <input
            onChange={handleChange}
            id="password"
            type="password"
            className="bg-white outline-none border-o"
          />
          <button
            disabled={loading}
            className="text-white bg-red-600 hover:opacity-80 my-4 p-2"
          >
            {loading ? <FcProcess /> : "sign in"}
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
