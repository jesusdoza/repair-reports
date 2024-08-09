import fs, { promises } from "fs";
import readline from "readline";
import path from "path";
import { pipeline } from "stream/promises";
type returnT = {
  objsParsed: number;
  error: string[] | null;
  patterns: PatternStatT[] | null;
};

type PatternStatT = {
  pattern: string[];
  count: number;
};

//hold current object structure desired to conform rest of objects
const currentPattern = {};

export default async function dataProfile(
  filePathStr: string,
  desiredPattern?: string[]
): Promise<returnT> {
  let reader: fs.ReadStream;

  let objsParsed: number = 0;

  const filePath = path.resolve(filePathStr);

  try {
    await promises.open(filePath, "r");
  } catch (err) {
    return { error: ["file does not exist"], objsParsed: 0, patterns: null };
  }

  return await parsFile(filePath);
}

async function parsFile(filePath: string): Promise<returnT> {
  let objsParsed = 0;
  let patterns: PatternStatT[] = [];
  let errors: string[] | null = null;

  let patternStrings: string[] = [];

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

        //get properties aka patter of obj
        const objPattern = getPattern(document);

        //string from pattern
        const patternStr = "".concat(...objPattern.sort());

        const foundPatternIndex = patternStrings.findIndex((text) => {
          // console.log("text", text);

          return patternStr === text;
        });

        if (foundPatternIndex == -1) {
          patterns.push({ count: 1, pattern: objPattern });
          patternStrings.push(patternStr);
        }

        if (foundPatternIndex != -1) {
          patterns[foundPatternIndex].count += 1;
        }
      } catch (error) {
        if (!errors) {
          errors = [`error Parsing line: ${line.slice(0, 20)}`];
          return;
        }
        errors.push(`error Parsing line: ${line.slice(0, 20)}`);
      }
    });

    rl.on("close", () => {
      resolve({ objsParsed, error: errors, patterns });
    });
  });
}

function getPattern(obj: object) {
  const values = Object.entries(obj);
  const props = Object.getOwnPropertyNames(obj);
  // console.log("props", props);
  // console.log("values", values);
  return props;
}
