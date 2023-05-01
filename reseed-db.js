import { writeFileSync } from "fs";
import { db_reseed } from "./dbCopy.js";

const db = db_reseed;
console.log(db.length);

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
