import { useEffect, useState, useCallback } from "react";
import RepairEditForm from "../components/RepairDisplay/RepairEditFormV2";
import useRepairApi from "../hooks/useRepairApi";
import { Repair } from "../classes/Repair";
import { useParams, useNavigate } from "react-router-dom";
import { RepairDataT } from "../../types";

import { RepairContextProvider } from "../context/RepairFormContext";

export default function EditRepairPageV2() {
  const { id: repairId } = useParams();
  const { getRepairById, updateRepair } = useRepairApi();
  const navigate = useNavigate();

  const [repair, setRepair] = useState<RepairDataT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitAllowed, setSubmitAllowed] = useState(true);

  const handleUpdateRepair = useCallback(
    async (repair: Repair) => {
      try {
        setSubmitAllowed(false);
        // console.log("repair", repair);
        await updateRepair(repair);
        setSubmitAllowed(true);
        navigate(`/repair/${repairId}`);
      } catch (error) {
        setSubmitAllowed(true);
        console.log("error handleUpdate @RepairPage ", error);
      }
    },
    [repairId]
  );

  useEffect(() => {
    if (!repairId) {
      setError("no id provided");
      return;
    }

    // load up repair data
    getRepairById(repairId)
      .then((data) => {
        console.log("data", data);
        setRepair(data as RepairDataT);
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
    <RepairContextProvider>
      <section>
        <h3>Edit Your Repair here V2</h3>
        {repair && (
          <RepairEditForm
            onSubmit={handleUpdateRepair}
            repair={repair}
            enabled={submitAllowed}
            submitType="Update"
          />
        )}
      </section>
    </RepairContextProvider>
  );
}
