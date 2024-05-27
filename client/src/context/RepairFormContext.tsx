import { createContext } from "react";
import { Repair } from "../classes/Repair";

export type RepairContextT = {
  title: string;
};

export const RepairContext = createContext<RepairContextT>({
  title: "",
});

export const RepairContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentRepairData = new Repair();

  return (
    <RepairContext.Provider value={currentRepairData}>
      {children}
    </RepairContext.Provider>
  );
};

//methods for updating repair
