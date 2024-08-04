import React, { useEffect, useState } from "react";

type FormDataT = {
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
};

type SignUpProps = {
  onSubmit?: ({
    username,
    email,
    password,
    inviteCode,
  }: {
    username: string;
    email: string;
    password: string;
    inviteCode: string;
  }) => void;
};

export default function SignupForm({ onSubmit }: SignUpProps) {
  const [formData, setFormData] = useState<FormDataT>({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    setErrors([]);
    setIsValidForm(true);
  }, [formData]);

  const handleSubmit = (formData: FormDataT) => {
    const { email, password, username, inviteCode } = formData;
    const formErrors = validateForm(formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);

    if (formErrors.length) {
      setErrors(formErrors);
      setIsValidForm(false);
      return;
    }

    if (onSubmit && formErrors.length == 0) {
      onSubmit({ email, password, username, inviteCode });
    }
  };

  return (
    <div>
      <form
        className="w-5/6"
        onSubmit={(event) => {
          event.preventDefault();

          handleSubmit(formData);
        }}>
        <div>
          {errors.map((err) => (
            <div className="badge text-black bg-red-300">{err}</div>
          ))}
        </div>
        <div className="flex flex-col align-middle justify-center items-center gap-2">
          <label className="max-w-xs flex flex-col">
            <div className="label">
              <span className="label-text">Username: </span>
            </div>
            <input
              value={formData.username}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, username: event.target.value };
                });
              }}
              type="text"
              placeholder="Username"
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>

          <label className="max-w-xs  flex flex-col justify-center">
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
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>

          <label className="max-w-xs  flex flex-col justify-center">
            <div className="label">
              <span className="label-text">Confirm Email: </span>
            </div>
            <input
              value={formData.confirmEmail}
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, confirmEmail: event.target.value };
                });
                //todo check matching data with other feild
              }}
              type="text"
              placeholder="Confirm Email"
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>

          <label className="max-w-xs flex flex-col justify-center">
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
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>

          <label className="max-w-xs flex flex-col">
            <div className="label">
              <span className="label-text">Confirm Password:</span>
            </div>
            <input
              onChange={(event) => {
                setFormData((state) => {
                  return {
                    ...state,
                    confirmPassword: event.target.value,
                  };
                });
                console.log(formData.password, formData.confirmPassword);
              }}
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>

          {/* invite code section */}

          <label className="max-w-xs flex flex-col">
            <div className="label">
              <span className="label-text">Invite Code:</span>
            </div>
            <input
              onChange={(event) => {
                setFormData((state) => {
                  return { ...state, inviteCode: event.target.value };
                });
              }}
              type="text"
              placeholder="Invite Code"
              className="input input-bordered text-black max-w-xs bg-slate-300"
            />
          </label>
          <button
            type="submit"
            className={
              "btn bg-teal-500 text-black hover:bg-teal-300" +
              (isSubmitted || !isValidForm ? "btn-disabled" : "")
            }>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

//**UTILITY FN */

function validateForm(form: FormDataT): string[] {
  const errors: string[] = [];

  if (form.email !== form.confirmEmail) {
    errors.push("emails do not match");
  }

  if (form.password !== form.confirmPassword) {
    errors.push("passwords do not match");
  }

  if (form.inviteCode.length < 3) {
    errors.push("invite must be included");
  }

  return errors;
}
