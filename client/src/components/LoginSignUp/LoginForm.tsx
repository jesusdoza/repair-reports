import React, { useState } from "react";
type LoginProps = {
  onLogin?: (email: string, password: string) => void;
};

export default function LoginForm({ onLogin }: onLoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div>
      <form
        className="w-5/6"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <div className="btn-xs btn w-48 ">Signup here</div>
        <div className="flex flex-col align-middle justify-center items-center gap-2">
          <label className="max-w-xs flex flex-col justify-center">
            <div className="label">
              <span className="label-text">Email: </span>
            </div>
            <input
              value={formData.email}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, email: event.target.value };
                });
              }}
              type="text"
              placeholder="Email"
              className="input input-bordered "
            />
          </label>
          <label className="max-w-xs flex flex-col">
            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              value={formData.password}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, password: event.target.value };
                });
              }}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button
            type="submit"
            className={"btn " + (isSubmitted ? "btn-disabled" : "")}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
