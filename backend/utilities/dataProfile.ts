import fs, { promises } from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export default async function dataProfile(filePathStr: string): Promise<{
  error?: string;
  objsParsed?: number;
}> {
  let reader: fs.ReadStream;

  let objsParsed: number = 0;

  const filePath = path.resolve(filePathStr);

  try {
    await promises.open(filePath, "r");
  } catch (err) {
    return { error: "file does not exist" };
  }

  return await parsFile(filePath);
}

async function parsFile(filePath: string): Promise<{ objsParsed: number }> {
  let objsParsed = 0;

  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(filePath, {
      encoding: "utf-8",
    });

    reader.on("data", (chunk) => {
      const text = chunk.toString();
      const documents = text.split("\n");
      //   console.log("documents.length", documents.length);

      objsParsed += documents.length;
    });

    reader.on("end", () => {
      resolve({ objsParsed });
    });
  });
}
