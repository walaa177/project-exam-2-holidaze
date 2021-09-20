import React from "react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import { Image } from "react-bootstrap";
import axios from "axios";
import AOS from "aos";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import ValidationError from "../ui/ValidationError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  AOS.init();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    await axios
      .post(url, data)
      .then((response) => {
        setAuth(response.data);
        window.location = "/admin/dashboard";
      })
      .catch((error) => {
        setLoginError(error.toString());
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div
      data-aos="zoom-in"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1500"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="login">
        <div className="login-content">
          <h2>Welcome Back! Please Sign In</h2>
          <Image src="/images/logo1.png" />
        </div>
        <div className="login-error">
          {loginError && <ValidationError>{loginError}</ValidationError>}
        </div>

        <fieldset disabled={submitting}>
          <div className="login-input">
            <input placeholder="Username" {...register("identifier")} />
            <div className="login-input-error">
              {errors.identifier && (
                <ValidationError>{errors.identifier.message}</ValidationError>
              )}
            </div>
          </div>

          <div className="login-input">
            <input
              placeholder="Password"
              type="Password"
              {...register("password")}
            />
            <div className="login-input-error">
              {errors.password && (
                <ValidationError>{errors.password.message}</ValidationError>
              )}
            </div>
          </div>
          <div className="text-center p-2">
            <button className="btn-info login-button">
              {submitting ? "Loggin in..." : "Login"}
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
