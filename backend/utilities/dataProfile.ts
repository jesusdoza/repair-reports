import { promises as fs } from "fs";

export default async function dataProfile(path: string) {
  let stream;

  try {
    await fs.open("myfile", "r");
  } catch (error) {
    return { error };
  }

  //   try {
  //     stream = await fs.createReadStream(path, {
  //       encoding: "utf-8",
  //     });

  //     return {};
  //   } catch (error) {
  //     console.log("stream failed");
  //     return { error: "failed to load file" };
  //   }
}
