import React from "react";

import DashboardPage from "./DashboardPage";
import { Repair } from "../../classes/Repair";
import { RepairCard } from "../../components/RepairList/RepairCard";

const testRepairList = [new Repair(), new Repair()];

export default function Dashboard(): React.ReactNode {
  const repairList = testRepairList; //TODO get users repairs from server hook

  const repairCards = repairList.map((repairObj) => {
    const procedure =
      repairObj?.procedureArr.length > 0
        ? repairObj?.procedureArr[0]
        : undefined;
    const imageObj =
      procedure && procedure.imageObjs.length > 0
        ? procedure.imageObjs[0]
        : undefined;
    const url = imageObj?.imageThumb ? imageObj?.imageThumb : undefined;
    const title = repairObj?.title ? repairObj?.title : "no title";
    const summary = procedure?.instructions
      ? procedure?.instructions
      : undefined;
    return (
      <RepairCard
        title={title}
        previewUrl={url}
        summary={summary}
      />
    );
  });

  return <DashboardPage repairList={repairCards} />;
}
