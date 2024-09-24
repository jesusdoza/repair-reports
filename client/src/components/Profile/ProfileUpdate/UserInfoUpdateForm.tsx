type userInfoProps = { email?: string; username?: string; edit: boolean };

export default function UserInforUpdateForm({
  email = "",
  username = "",
  edit = false,
}: userInfoProps) {
  return (
    <section>
      <form action="">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{"email"}</span>
          </div>
          <input
            disabled={!edit}
            name="email"
            type="text"
            placeholder={email}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{"username"}</span>
          </div>
          <input
            disabled={!edit}
            type="text"
            name="username"
            placeholder={username}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </form>

      <form>
        <section>
          <h3>Change password</h3>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Current Password</span>
            </div>
            <input
              disabled={!edit}
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <input
                disabled={!edit}
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Confirm new password</span>
              </div>
              <input
                disabled={!edit}
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </section>
      </form>
    </section>
  );
}
