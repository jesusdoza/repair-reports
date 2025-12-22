import React, { useState } from "react";
import useRepairApi from "../../hooks/useRepairApi";

export default function Search(): React.ReactNode {
  const { searchForRepair } = useRepairApi();

  const [search, setSearch] = useState("");
  const handleSearch = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await searchForRepair(search);
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="searchPhrase"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}
