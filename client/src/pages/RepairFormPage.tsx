import RepairEditForm from "../components/RepairDisplay/RepairEditForm";
import useRepairApi from "../hooks/useRepairApi";

export default function RepairFormPage(): React.ReactNode {
  const { postRepair } = useRepairApi();

  return <RepairEditForm onSubmit={postRepair} />;
}
