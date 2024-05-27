import { createContext } from "react";
import { Repair } from "../classes/Repair";

// export type RepairContextT = {
//   title: string;
// };

const repairData = new Repair();

export const RepairContext = createContext<Repair>(repairData);

export const RepairContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RepairContext.Provider value={repairData}>
      {children}
    </RepairContext.Provider>
  );
};

//methods for updating repair
