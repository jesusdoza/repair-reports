import React from "react";

export function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void;
}) {
  return (
    <li
      key={url}
      className="w-3/4 bg-green-400">
      <div className="flex flex-col">
        <img
          src={url}
          className="rounded-box "
        />
        <label
          htmlFor=""
          className="">
          <h3>original url</h3>
          <input
            type="text"
            disabled
            value={url}
          />
        </label>
        <label
          htmlFor=""
          className="">
          <h3>Upload new image</h3>
        </label>
      </div>
    </li>
  );
}
