export function ImageCard({ url }: { url: string }) {
  const validLink = !url.startsWith("data:image");
  const imageLink = validLink ? url : "#";

  return (
    <section
      data-testid="image-preview"
      className="w-full flex flex-col  h-full">
      <a
        href={validLink ? imageLink : "javascript:void(0)"}
        target={validLink ? "_blank" : ""}>
        <img
          src={url}
          className="rounded-box"
        />
      </a>
    </section>
  );
}
