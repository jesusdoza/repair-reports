import { v4 as uuidv4 } from "uuid";

type dashboardProps = {
  repairList: React.ReactNode[];
};

export default function DashboardPage({ repairList }: dashboardProps) {
  const list = repairList.map((card) => {
    return (
      <li
        className="sm:w-full md:w-1/2 lg:w-1/5 p-1"
        key={uuidv4()}>
        {card}
      </li>
    );
  });
  return (
    <div className="flex  min-h-screen">
      <aside className=" w-1/6 bg-slate-600">
        <h3>Filter</h3>
      </aside>
      <main className="w-5/6 bg-green-600 ">
        <h3>Your Repairs</h3>
        <section>
          <ul className="flex flex-wrap w-full items-center ">{list}</ul>
        </section>
      </main>
    </div>
  );
}
