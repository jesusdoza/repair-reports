import React from "react";

export default function JoinWithInviteForm() {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Join a group</h1>
            <p className="py-6">
              Input your invite and code and optionally if there is a passphrase
              add that too.
            </p>
            <form>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Invite Code</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              {/*  */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt">Optional</span>
                </div>
              </label>
              <button className="btn btn-primary">Join in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
