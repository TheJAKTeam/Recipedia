import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import style from "../../commonStyles/Form.module.css";

const LogIn = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const sendLogInRequest = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/login`,
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
        localStorage.setItem("isLoggedIn", "true");
        history.push("/");
        window.location.reload();
      } else if (response.status === 401) {
        toast.error("Your email or password is incorrect. Please try again.");
      } else {
        toast.error(
          "An error occurred while trying to log you in. Please try again."
        );
      }
    } catch (err) {
      toast.error(
        "An error occurred while trying to log you in. Please try again."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form
        className={style.authForm}
        onSubmit={handleSubmit(sendLogInRequest)}
      >
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
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
