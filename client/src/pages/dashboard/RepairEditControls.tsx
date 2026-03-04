import { v4 } from "uuid";
import { ControlOption } from "./UsersRepairs";
import { useNavigate } from "react-router-dom";

export function RepairEditControls({ id }: { id: string }) {
  const navigate = useNavigate();
  const controls: ControlOption[] = [
    {
      name: "view",
      action: () => {
        navigate(`/repair/${id}`);
        // navigate to the repair details page
      },
    },
    {
      name: "edit",
      action: () => {
        console.log("edit button");
      },
    },
    {
      name: "delete",
      action: () => {
        console.log("delete button");
      },
    },
  ];
  const buttons = controls.map((control: ControlOption) => {
    return (
      <li key={v4()}>
        <a
          className="btn w-full hover:bg-slate-600"
          onClick={() => {
            control.action();
          }}>
          {control.name}
        </a>
      </li>
    );
  });

  return <ul className="z-1 flex flex-col gap-2">{buttons}</ul>;
}
