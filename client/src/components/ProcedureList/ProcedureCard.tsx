import { ProcedureT } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { ImageCard } from "../ImageCard/ImagePreviewCard";
import { useRef } from "react";

export function ProcedureCard({ proc }: { proc: ProcedureT }) {
  const containerRef = useRef<HTMLUListElement>(null);

  const images = proc.images.map((url: string, index: number) => {
    const imageId = uuidv4();

    return (
      <li
        key={uuidv4()}
        id={imageId}
        className="carousel-item bg-slate-500 w-3/4 flex items-center lg:w-1/3 print:w-3/4 relative">
        <ImageCard
          key={imageId}
          url={url}
        />
        <div className="btn btn-sm absolute top-0 opacity-95">{index + 1}</div>
      </li>
    );
  });

  const scrollToImage = (index: number) => {
    if (containerRef.current) {
      const imageElement = containerRef.current.children[index] as HTMLElement;
      if (imageElement) {
        containerRef.current.scrollTo({
          left: imageElement.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <li key={uuidv4()}>
      <ul
        ref={containerRef}
        className="flex flex-row w-full p-4 space-x-4 bg-neutral rounded-box overflow-x-auto print:flex-col print:items-center">
        {images}
      </ul>

      <ScrollButtons
        list={images.map((_, index) => String(index + 1))}
        clickFn={scrollToImage}
      />

      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <p className="p-4 text-center text-gray">{proc.instructions}</p>
      </section>
    </li>
  );
}

function ScrollButtons({
  clickFn,
  list,
}: {
  list: string[];
  clickFn: (index: number) => void;
}) {
  return (
    <div className="flex w-full justify-center gap-7">
      {list.map((label, index) => {
        return (
          <div
            onClick={() => clickFn(index)}
            className="btn print:invisible">
            {label}
          </div>
        );
      })}
    </div>
  );
}
