import { pipeline } from "stream";
import fs from "fs";
import csv from "csvtojson";

pipeline(
    fs.createReadStream("./public/source.csv"),
    csv(),
    fs.createWriteStream("./public/out.txt"),
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        } else {
            console.log("Pipeline succeeded.");
        }
    }
);