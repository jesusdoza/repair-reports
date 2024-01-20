import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SignUpCard() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [confirmEmail, setConfirmEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex justify-center w-full">
      <div className=" flex justify-center w-96">
        <div className="bg-slate-500 modal-box p-2 h-full flex flex-col gap-3 w-full">
          <h3 className="font-bold text-lg text-center">Please Signup</h3>

          <div className="flex flex-col align-middle justify-center items-center gap-2">
            <label className="max-w-xs flex flex-col">
              <div className="label">
                <span className="label-text">Username: </span>
              </div>
              <input
                onChange={(event) => {
                  setFormData((state) => {
                    return { ...state, username: event.target.value };
                  });
                }}
                type="text"
                placeholder="Username"
                className="input input-bordered "
              />
            </label>
            <label className="max-w-xs  flex flex-col justify-center">
              <div className="label">
                <span className="label-text">Email: </span>
              </div>
              <input
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
            <label className="max-w-xs  flex flex-col justify-center">
              <div className="label">
                <span className="label-text">Confirm Email: </span>
              </div>
              <input
                onChange={(event) => {
                  setFormData((state) => {
                    return { ...state, confirmEmail: event.target.value };
                  });
                  //todo check matching data with other feild
                }}
                type="text"
                placeholder="Confirm Email"
                className="input input-bordered "
              />
            </label>
            <label className="max-w-xs flex flex-col">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
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
            <label className="max-w-xs flex flex-col">
              <div className="label">
                <span className="label-text">Confirm Password:</span>
              </div>
              <input
                onChange={(event) => {
                  setFormData((state) => {
                    return { ...state, confirmPassword: event.target.value };
                  });
                }}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="flex flex-row-reverse">
            <div
              onClick={() => {
                //todo validate form
                if (false) {
                  login(formData.username, formData.password);
                }
              }}
              className="btn disabled">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
