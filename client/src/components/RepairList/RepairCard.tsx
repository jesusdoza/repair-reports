import { repairDataT } from "../../hooks/useGetLatest";

export const RepairCard = ({ data }: { data: repairDataT }) => {
  return (
    <>
      <section className=" flex flex-col p-2">
        <h2>{data.title}</h2>
        <span>Repair ID: {data._id}</span>
        <span>Board Type: {data.boardType}</span>
        <span>Created By: {data.createdBy}</span>
        <span>Engine Make: {data.engineMake}</span>
        <span>Group: {data.group}</span>
      </section>
    </>
  );
};
