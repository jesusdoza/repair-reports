import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureForm from "./EditProcedureForm";
import useUpdateProcedures from "../../hooks/useUpdateProcedures";

export default function EditProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  //
  //state holding all procedures on an array
  const { currentList: currentProcedures, dispatch } =
    useUpdateProcedures(list);

  const procedures = currentProcedures.map((proc) => {
    return (
      <EditProcedureForm
        reducer={dispatch}
        proc={proc}
      />
    );
  });
  // console.log("currentList", currentList);
  return (
    <div>
      <ul>{procedures}</ul>
    </div>
  );
}
