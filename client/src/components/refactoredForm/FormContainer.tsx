import { useEffect, useState } from "react";
import { Repair } from "../../classes/Repair";
import { Procedure } from "../../classes/Procedure";
import { addItemAtIndex } from "../../hooks/utils/addItem";

export default function FormContainer({
  initialFormState,
  id,
}: {
  initialFormState: Repair;
  id: string;
}) {
  useEffect(() => {
    console.log("rendered form container id ", id);
    console.log("initialFormState", initialFormState);
    console.log("formdata ", formData);
  }, []);

  let formData = { ...initialFormState };

  return (
    <div>
      {id}

      <section>
        <h2>description</h2>
        <label htmlFor="title">
          <h3>title</h3>
          <input
            type="text"
            id="title"
            name="title"
          />
        </label>
      </section>

      <section>
        <ProcedureListContainer procedures={formData.procedureArr} />
      </section>
    </div>
  );
}

type ProcedureListContainerProps = { procedures: Procedure[] };

function ProcedureListContainer({ procedures }: ProcedureListContainerProps) {
  const [procComponents, setProcComponents] = useState(
    procedures.map((proc) => {
      return <div>{proc.id}</div>;
    })
  );

  return (
    <div>
      <h2>procedures</h2>
      <div>{procComponents}</div>
    </div>
  );
}
