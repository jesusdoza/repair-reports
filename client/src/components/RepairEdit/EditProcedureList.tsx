import { ProcedureT } from "../../hooks/useGetLatest";
import ProcedureForm from "./EditProcedureCard";
import useUpdateProcedures from "../../hooks/useUpdateProcedures";

export default function EditProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  //
  //state holding all procedures on an array
  const { currentList, dispatch } = useUpdateProcedures(list);

  const procedures = currentList.map((proc) => {
    return (
      <ProcedureForm
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
