"use client";

import AvailableOptionsMulti from "../AvailableOptions/AvailableOptionsMulti";

// Panel for editing extra data (title, description, etc.)
type RepairDetailsPanelProps = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  category: string[];
  setCategory: (v: string[]) => void;
  manufacturer: string;
  setManufacturer: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  visibility: "public" | "organization";
  setVisibility: (v: "public" | "organization") => void;
};
// Component for editing the repair details, such as title, description, category, etc.
export function RepairDetailsPanel({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  manufacturer,
  setManufacturer,
  type,
  setType,
  visibility,
  setVisibility,
}: RepairDetailsPanelProps) {
  const categoryOptions =
    category && category.length > 0
      ? category.map((cat) => ({ value: cat, label: cat }))
      : [];

  return (
    <section className="bg-card border border-border rounded-xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Repair Details</h2>
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-100"
          rows={2}
        />
      </label>
      {/* <label htmlFor="category">
        Category
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label> */}
      <label htmlFor="category">
        Category
        <AvailableOptionsMulti
          callback={(options) => {
            setCategory(options);
          }}
          id="category"
          options={categoryOptions}
        />
      </label>

      <label htmlFor="manufacturer">
        Manufacturer
        <input
          id="manufacturer"
          type="text"
          placeholder="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <label htmlFor="type">
        Type
        <input
          id="type"
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input input-bordered w-full bg-gray-100"
        />
      </label>

      <div className="flex items-center gap-2">
        <label
          htmlFor="visibility"
          className="font-medium">
          Visibility:
          <select
            id="visibility"
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "public" | "organization")
            }
            className="select select-bordered bg-gray-100">
            <option value="public">Public</option>
            <option value="organization">Organization</option>
          </select>
        </label>
      </div>
    </section>
  );
}
