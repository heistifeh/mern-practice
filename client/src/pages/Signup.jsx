import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
        setLoading(false);
        setError(data.message);
      }
      console.log(data, "user data here");
      setLoading(false);
      setError(null);

      // res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.message);
    }
    // console.log("submitted");
  };
  return (
    <div className="bg-slate-200">
      <div className="max-w-lg mx-auto  ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl text-center">SIGN UP</h1>
          <label>Username: </label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            className="bg-white outline-none border-o"
          />
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
            {loading ? "loading..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
