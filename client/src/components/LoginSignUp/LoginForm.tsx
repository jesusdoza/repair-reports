import React, { useEffect, useState } from "react";

type FormDataT = {
  email: string;
  password: string;
};

type LoginProps = {
  onLogin?: (email: string, password: string) => void;
};

export default function LoginForm({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState<FormDataT>({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors([]);
    setIsValidForm(true);
  }, [formData]);

  return (
    <div>
      <form
        className="w-5/6"
        onSubmit={(event) => {
          setIsSubmitted(true);
          event.preventDefault();

          const formErrors = validateForm(formData);

          setTimeout(() => {
            setIsSubmitted(false);
          }, 3000);

          if (formErrors.length) {
            setErrors(formErrors);
            setIsValidForm(false);
            return;
          }

          if (onLogin && formErrors.length == 0) {
            onLogin(formData.email, formData.password);
          }
        }}>
        <div>
          {errors.map((err) => (
            <div className="badge bg-red-500 text-black">{err}</div>
          ))}
        </div>
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
            className={
              "btn " + (isSubmitted || !isValidForm ? "btn-disabled" : "")
            }>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

//***UTILITY */
function validateForm(form: FormDataT) {
  const errors: string[] = [];

  if (form.email.length < 3) {
    errors.push("email invalid");
  }
  if (form.password.length < 1) {
    errors.push("password is required");
  }

  return errors;
}
