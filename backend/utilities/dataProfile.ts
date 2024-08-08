import fs, { promises } from "fs";
import readline from "readline";
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
  let patterns = [];
  let dataObjects: any[] = [];

  return new Promise((resolve, reject) => {
    const readerStream = fs.createReadStream(filePath, {
      encoding: "utf-8",
    });

    const rl = readline.createInterface({
      input: readerStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      try {
        const document = JSON.parse(line);
        objsParsed += 1;
      } catch (error) {
        console.log("error Parsing line", line.slice(0, 20));
        console.log("error", error);
      }
    });

    rl.on("close", () => {
      resolve({ objsParsed });
    });

    // reader.on("data", (chunk) => {
    //   const text = chunk.toString();
    //   let documents = text.split(/\}$/);

    //   documents.forEach((doc, index) => {
    //     try {
    //       const obj = JSON.parse(doc);
    //       // if (index % 10 == 0) {
    //       //   console.log("Obj", index, obj);
    //       // }
    //     } catch (error) {
    //       console.log("ERROR PARSING index:", index);
    //       console.log("ERROR PARSING string:", doc.slice(-20));
    //       console.log("error: ", error);
    //     }
    //   });

    //   //   console.log("documents.length", documents.length);

    //   objsParsed += documents.length;
    // });

    // reader.on("end", () => {
    //   resolve({ objsParsed });
    // });
  });
}

function checkpattern() {}
