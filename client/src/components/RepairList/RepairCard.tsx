import { useState } from "react";
import noImagePlaceholder from "../../assets/no-image.png";

export const RepairCard = ({
  previewUrl = noImagePlaceholder,
  summary,
  title,
}: {
  previewUrl?: string;
  title?: string;
  summary?: string;
}): React.ReactNode => {
  // console.log("data", data);

  const [previewImageUrl, setPreviewUrl] = useState(previewUrl);

  return (
    <div className="w-full h-[400px] p-2">
      <div
        data-test="entry"
        className="bg-card border border-border rounded-xl shadow-lg h-full flex flex-col overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
        <figure className="h-2/3 w-full bg-muted flex items-center justify-center overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={previewImageUrl}
            alt={title || "Repair preview"}
            onError={() => {
              setPreviewUrl(noImagePlaceholder);
            }}
          />
        </figure>
        <div className="flex-1 flex flex-col justify-between p-4">
          {title && (
            <h2
              className="text-lg font-semibold text-primary mb-2 truncate"
              title={title}>
              {title}
            </h2>
          )}
          {summary && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
