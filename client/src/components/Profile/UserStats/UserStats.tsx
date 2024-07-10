export default function UserStats() {
  return (
    <div className="flex flex-col">
      <div className="self-center">
        <div className="avatar">
          <div className="w-[300px] rounded-xl">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <section className="flex gap-1">
          <button className="btn ">
            <div>
              <span className="block">Total Repairs</span>
              <div className="badge">99</div>
            </div>
          </button>
          <button className="btn ">
            <div>
              <span className="block">Joined Groups</span>
              <div className="badge">99</div>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}
