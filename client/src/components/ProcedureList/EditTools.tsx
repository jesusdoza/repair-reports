import { NavLink } from "react-router-dom";
import ModalConfirm from "../Modals/ModalConfirm";

type editToolsPropsT = {
  id: string;
};

export default function EditTools({ id }: editToolsPropsT): React.ReactNode {
  const editUrl = `/repair/edit/${id}`;
  const deleteUrl = `/repair/delete/${id}`;

  return (
    <section>
      {/*  */}

      <details className="dropdown dropdown-right dropdown-end">
        <summary className="btn m-1">Edit Tools</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li className="w-full">
            <ModalConfirm label="Edit Repair">
              <div>
                Confirm Edit :
                <NavLink
                  className="btn"
                  // state={repairData}
                  to={editUrl}>
                  Edit Repair
                </NavLink>
              </div>
            </ModalConfirm>
          </li>
          <li className="w-full">
            <ModalConfirm label="Delete Repair">
              <div>
                Confirm DELETE :
                <NavLink
                  className="btn"
                  // state={repairData}
                  to={deleteUrl}>
                  DELETE REPAIR
                </NavLink>
              </div>
            </ModalConfirm>
          </li>
        </ul>
      </details>

      {/* / */}
    </section>
  );
}
