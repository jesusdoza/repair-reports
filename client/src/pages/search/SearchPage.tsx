import { useParams, useSearchParams } from "react-router-dom";
import RepairList from "../../components/RepairList/RepairList";

// type SearchPagePropsT = {
//   search?: string;
//   limit?: number;
//   page?: number;
// };

export default function SearchPage() {
  // const { search, limit, page } = useParams();
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  console.log("search, limit, page,", search, limit, page);
  return (
    <div>
      <p>Search Results for {search}</p>
      <RepairList repairList={[]} />
    </div>
  );
}
