import { useParams } from "react-router-dom";
import useRepairApi from "../../hooks/useRepairApi";
import { useEffect, useState } from "react";

export default function DeleteRepairPage() {
  const { deleteRepair } = useRepairApi();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const repairId = params["id"];
  useEffect(() => {
    if (repairId && !loading) {
      setLoading(true);
      console.log("delete repair");
      console.log("repairId", repairId);

      deleteRepair(repairId)
        .then((data) => {
          console.log("data", data);
          setLoading(false); // Optional, based on your flow
        })
        .catch((error) => {
          // Handle error if necessary
          console.error("Error deleting repair:", error);
          setLoading(false); // Reset loading state if there's an error
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[500px] w-screen">
      <h1>Deleting Repair</h1>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
