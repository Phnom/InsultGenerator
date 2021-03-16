const fs = require("fs")
let insultList = JSON.parse(
  fs.readFileSync("insults.json", { encoding: "utf-8" })
)
insultList.insults = insultList.insults.map((insults, index) =>
  insults.id ? insults : { ...insults, id: index + 1 }
)
fs.writeFileSync("insults.json", JSON.stringify(insultList, null, 2))
