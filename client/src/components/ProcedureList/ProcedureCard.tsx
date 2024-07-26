import { ProcedureT } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { ImageCard } from "../ImageCard/ImagePreviewCard";

export function ProcedureCard({ proc }: { proc: ProcedureT }) {
  const images = proc.images.map((url: string) => {
    return (
      <li
        key={uuidv4()}
        className="carousel-item w-3/4 flex items-center">
        <ImageCard
          key={uuidv4()}
          url={url}
        />
      </li>
    );
  });
  return (
    <li key={uuidv4()}>
      <ul className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
        {images}
      </ul>
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <p className="p-4 text-center text-gray">{proc.instructions}</p>
      </section>
    </li>
  );
}
