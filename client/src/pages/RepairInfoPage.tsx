import { useParams } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";

// type props = { data: repairDataT };

export const RepairInfoPage = () => {
  const { repair_id } = useParams();
  console.log("data at repair info page", repair_id);
  return (
    <section>
      <h1>Repair title</h1>
      <section>
        <span>Repair procedures</span>
      </section>
      <section>repair edit tools</section>
      <section>
        <span>comments section</span>
      </section>
    </section>
  );
};
