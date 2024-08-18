import { useRef } from "react";
import image from "../../../assets/Live collaboration-rafiki.svg";

type JoinWithInvitePropsT = {
  onSubmit: (inviteCode: string, password?: string) => void;
  errors: string[];
};

export default function JoinWithInviteForm({
  onSubmit,
  errors,
}: JoinWithInvitePropsT) {
  const inviteCode = useRef("");
  const password = useRef<string | undefined>(undefined);

  return (
    <div className="w-full">
      {errors.length ? (
        <div className="absolute w-full">
          <ErrorDisplay errors={errors} />
        </div>
      ) : null}

      <div className="hero  bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-full ">
          <img
            src={image}
            className="max-w-sm rounded-lg shadow-2xl  bg-green-300"
          />
          <div>
            <h1 className="text-5xl font-bold">Join a group</h1>
            <p className="py-6">
              Input your invite and code and optionally if there is a passphrase
              add that too.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (inviteCode.current) {
                  onSubmit(inviteCode.current, password.current);
                }
              }}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Invite Code</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    inviteCode.current = e.target.value;
                  }}
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
                  onChange={(e) => {
                    password.current = e.target.value || undefined;
                  }}
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

function ErrorDisplay({ errors }: { errors: string[] }) {
  const errorsDisplay = errors.map((str) => {
    return <span>{str}</span>;
  });
  return (
    <>
      <div
        role="alert"
        className="alert alert-warning flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        {errorsDisplay}
      </div>
    </>
  );
}
