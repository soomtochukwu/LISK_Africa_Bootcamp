import { str } from "./w";

import { writeFileSync } from "fs";

(async () => {
  await writeFileSync(
    "./str.ts",
    await JSON.stringify(await str.split(" ").filter((x) => x.length > 1)),
    "utf8"
  );
})();
