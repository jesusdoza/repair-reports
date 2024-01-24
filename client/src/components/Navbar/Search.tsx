import React from "react";

export default function Search() {
  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("event", event);
  };
  return (
    <form onSubmit={(event) => handleSearch(event)}>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}
