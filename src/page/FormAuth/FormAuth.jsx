import { useForm } from "react-hook-form";
import { useState } from "react";

import stlAuthForm from "./FormAuth.module.scss";

function FormAuth() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    let response = fetch("./", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setError("error");
    }
    return response.status;
  };

  return (
    <form className={stlAuthForm.formAuth} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      {error !== "" ? <span style={{ color: "red" }}>Неверное имя пользователя или пароль!</span> : null}
      <div className={stlAuthForm.formAuth_inputs}>
        <label>Email address</label>
        <input
          {...register("email", {
            required: "Не должен быть пустым",
          })}
          type='email'
          placeholder='Email address'
          className={stlAuthForm.formAuth_input}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          className={stlAuthForm.formAuth_input}
          {...register("password", {
            required: "Не должен быть пустым",
          })}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
      </div>

      <input type='submit' value='Login' className={stlAuthForm.buttonFormAuth} />

      <span className={stlAuthForm.footer}>
        Don’t have an account? <a href='/#'> Sign Up</a>.
      </span>
    </form>
  );
}

export default FormAuth;
