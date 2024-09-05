import useRepairApi from "../../hooks/useRepairApi";

export default function DeleteRepairPage() {
  const { deleteRepair } = useRepairApi();
  return (
    <div className="flex justify-center items-center h-[500px] w-screen">
      <h1>Deleting Repair</h1>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
