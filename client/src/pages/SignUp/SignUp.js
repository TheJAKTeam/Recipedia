import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import style from "../../commonStyles/Form.module.css";

const SignUp = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const sendSignUpRequest = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        toast.success(
          "Your account has successfully been created! Please log in."
        );
        history.push("/login");
      } else {
        toast.error(
          "An error occurred while trying to sign you up. Please try again."
        );
      }
    } catch (err) {
      toast.error(
        "An error occurred while trying to sign you up. Please try again."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        className={style.authForm}
        onSubmit={handleSubmit(sendSignUpRequest)}
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            {...register("firstName")}
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            type="text"
            id="lastName"
            {...register("lastName")}
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            {...register("email")}
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            {...register("password")}
            disabled={submitting}
            required
          />
        </div>

        <div className={style.submitButtonContainer}>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
