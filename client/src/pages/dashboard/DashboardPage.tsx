import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FilterRepairsContainer from "../../components/RepairList/FilterRepairs/FilterRepairsContainer";

type dashboardProps = {
  repairList: React.ReactNode[];
};

export default function DashboardPage({ repairList }: dashboardProps) {
  const styledList = repairList.map((card) => {
    return (
      <li
        className="sm:w-full md:w-1/2 lg:w-1/5 p-1"
        key={uuidv4()}>
        {card}
      </li>
    );
  });

  const [filterdList, setFilteredList] = useState(styledList);

  return (
    <div>
      <h3>Your Repairs</h3>
      <section>
        <ul className="flex flex-wrap w-full items-center ">{filterdList}</ul>
      </section>
    </div>
  );
}
