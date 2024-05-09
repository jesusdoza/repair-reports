import { RepairCard } from "../../components/RepairList/RepairCard";

export default function DashboardPage() {
  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <h3>Filter</h3>
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <h3>Your Repairs</h3>
        <section>
          <ul className="flex flex-wrap w-full items-center ">
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
            <li className="sm:w-full md:w-1/2 lg:w-1/5 p-1">
              <RepairCard
                title="test"
                summary="summary here"
              />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
