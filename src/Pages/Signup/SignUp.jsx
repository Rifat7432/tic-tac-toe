import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { FaChevronLeft } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.from.pathname;
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signUpByGoogle, signUp, updateUser, removeUser } =
    useContext(AuthContext);
  const getToken = (email) => {
    fetch(`https://mobiledazzar.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("successful", "sign up successful.", "success");
        localStorage.setItem("token", data.accessToken);
        reset({
          email: "",
          password: "",
          role: "Select one",
        });
      })
      .catch((e) => {
        removeUser()
          .then(() => {
            toast.error("something is wrong .Please try again !");
          })
          .catch((e) => console.error(e));
      });
  };
  const addUser = (email, name) => {
    let user = {
      email,
      name,
    };

    fetch("https://tic-tac-toe-server-pi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          navigate("/");
          reset({
            email: "",
            password: "",
            name: "",
          });
        }
      })
      .catch((e) => {
        removeUser()
          .then(() => {
            toast.error("something is wrong .Please try again !");
          })
          .catch((e) => console.error(e));
      });
  };
  const handleSignUp = (data) => {
    const { name, email, password } = data;

    signUp(email, password)
      .then((Result) => {
        addUser(email, name);
        updateUser(name);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="hero py-1 ">
      <div className="card w-96 py-5 relative shadow-2xl bg-base-100">
        <div className="absolute top-2 left-2">
          <Link to={"/"}>
            <FaChevronLeft></FaChevronLeft>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
          <h1 className="text-xl text-start">Create an account</h1>
          <h1 className="text-4xl font-bold text-start">
            Let's get to know you better
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register("name", { required: "Enter your name" })}
            />
            {errors?.name && (
              <p className="text-red-500">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">email</span>
            </label>
            <input
              type={"email"}
              className="input input-bordered w-full"
              {...register("email", {
                required: "Enter Your email",
              })}
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={"password"}
              className="input input-bordered w-full "
              {...register("password", { required: "Enter your password" })}
            />
            {errors?.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-warning">SignUp</button>
          </div>
        </form>
        <div>
          <label className="ml-5 label">
            <p>
              Already have account
              <Link
                to={"/login"}
                className="label-text-alt link text-lg text-orange-500 link-hover"
              >
                {" "}
                Login
              </Link>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
