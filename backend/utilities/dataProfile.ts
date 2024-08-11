import fs, { promises } from "fs";
import readline from "readline";
import path from "path";
import { pipeline } from "stream/promises";
import { find } from "../models/Repair";

type returnT = {
  objsParsed: number;
  error: string[] | null;
  patterns: { pattern: string[]; count: number; missing?: string[] }[];
};

type PatternStatT = {
  pattern: string[];
  count: number;
};

type patternsFoundT = {
  objsParsed: number;
  patterns: PatternStatT[];
  error: string[] | null;
};

//hold current object structure desired to conform rest of objects
const currentPattern = {};

export default async function dataProfile(
  filePathStr: string,
  desiredPattern?: string[]
): Promise<returnT> {
  let reader: fs.ReadStream;
  let objsParsed: number = 0;
  let patternsFound: PatternStatT[] = [];
  let errors: string[] | null = null;

  const filePath = path.resolve(filePathStr);

  try {
    await promises.open(filePath, "r");
  } catch (err) {
    return { error: ["file does not exist"], objsParsed: 0, patterns: [] };
  }

  const processedFile = await findPatterns(filePath);

  objsParsed = processedFile.objsParsed;
  patternsFound = processedFile.patterns;

  if (desiredPattern) {
    patternsFound = patternsFound.map((p) => {
      const missing: string[] = findMissing(desiredPattern, p.pattern);

      return { ...p, missing };
    });
  }

  return { objsParsed, patterns: patternsFound, error: errors };
}

async function findPatterns(filePath: string): Promise<patternsFoundT> {
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
      //todo process patterns for fixes

      resolve({ objsParsed, error: errors, patterns });
    });
  });
}

function getPattern(obj: object) {
  const values = Object.entries(obj);
  const props = Object.getOwnPropertyNames(obj);
  return props;
}

export function findMissing(desiredPattern: string[], pattern: string[]) {
  // const extra: string = [];
  const missing: string[] = [];

  const temp = [...pattern].sort();

  desiredPattern.forEach((p) => {
    const foundIndex = temp.findIndex((item) => item == p);
    if (foundIndex == -1) {
      missing.push(p);
    }
  });

  return missing;
}
