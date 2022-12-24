import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { AuthContext } from "../ContextProvider/AuthProvider";
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.from.pathname || "/";
  const { login, user, logOut } = useContext(AuthContext);

  const handleLogin = (data) => {
    const { email, password } = data;
    login(email, password)
      .then((result) => {
        navigate(form, { replace: true });
        reset({
          email: "",
          password: "",
        });
      })
      .catch((e) => toast.error(e.message));
  };
  return (
    <div>
      <div className="card w-96 mx-auto relative mt-16 py-5 shadow-2xl bg-base-100">
        <div className="absolute top-2 left-2">
          <Link to={"/"}>
            <FaChevronLeft></FaChevronLeft>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <h1 className="text-4xl font-bold text-start">
            Please Enter your details{" "}
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type={"email"}
              className="input input-bordered w-full "
              {...register("email", { required: "Enter your email" })}
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>
          <div className="form-control">
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
            <button className="btn btn-warning">Login</button>
          </div>
        </form>
        <div>
          <label className="ml-5 label">
            <p>
              New to Async Tic Tac Toe
              <Link
                to={"/SignUp"}
                className="label-text-alt link text-lg text-orange-500 link-hover"
              >
                {" "}
                Create an account
              </Link>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
