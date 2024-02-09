import { repairDataT } from "../../hooks/useGetLatest";
import { Link } from "react-router-dom";

export const RepairCard = ({ data }: { data: repairDataT }) => {
  console.log("data", data);

  const previewImageUrl =
    data.procedureArr.length > 0 && data?.procedureArr[0]?.images[0]
      ? data.procedureArr[0]?.images[0]
      : "#";

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
      <li
        data-test="entry"
        className=" entry  ">
        {/* <Link className=" " href="/repair/<%= repairs[i]._id%>"> */}
        <Link
          state={data}
          to={`/repair/${data._id}`}
          className=" ">
          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                loading="lazy"
                src={previewImageUrl}
                alt="repair preview image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.title}</h2>
              <p>
                {data.procedureArr.length > 0 &&
                  data.procedureArr[0]?.instructions}
              </p>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};
