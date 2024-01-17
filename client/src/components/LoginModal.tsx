import React from "react";

export default function LoginModal() {
  return (
    <div className="flex justify-center h-96">
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <div className=" flex justify-center w-full modal-middle">
        <div className="modal-box flex flex-col gap-3">
          <h3 className="font-bold text-lg text-center">Please Login</h3>

          <div className="flex gap-2">
            <label className="max-w-xs  flex flex-col justify-center">
              <div className="label">
                <span className="label-text">Username: </span>
              </div>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered "
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="flex flex-row-reverse">
            <div className="btn">Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
