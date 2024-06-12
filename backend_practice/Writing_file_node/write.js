const fs = require("fs");
const textIn = fs.readFileSync("./input.txt", "utf-8");
const textout = `This is the content of the file that i read ${textIn} at date and time ${Date.now()}`;
fs.writeFileSync("./output.txt", textout);
console.log("Writen to file");
