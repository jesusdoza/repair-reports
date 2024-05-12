import { useEffect, useState } from "react";
import RepairEditForm from "../components/RepairDisplay/RepairEditForm";
import useRepairApi from "../hooks/useRepairApi";
import { Repair } from "../classes/Repair";

export default function EditRepairPage({
  repairId = "1",
}: {
  repairId: string;
}) {
  const { getRepairById } = useRepairApi();

  const [repair, setRepair] = useState<Repair | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!repairId) {
      setError("no id provided");
      return;
    }
    getRepairById(repairId)
      .then((data) => {
        setRepair(data);
      })
      .catch((error) => {
        console.log("error getting repair for edit", error);
        setError(`error getting repair id :${repairId}`);
      });
  }, [repairId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      <h3>Edit Your Repair here</h3>
      {/* <span>{repair && repair.title}</span> */}
      <RepairEditForm repair={repair} />
    </section>
  );
}
