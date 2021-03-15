const express = require("express")
require("dotenv").config()

const app = express()
const PORT = process.env.Port || 3000

app.use(express.static("public"))
app.use(express.urlencoded())

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  const insultList = require("./src/insults.json")
  random = Math.floor(Math.random() * insultList.insults.length)
  res.render("index", {
    insult: insultList.insults[random],
  })
})

app.get("/search", (req, res) => {
  let insultList = require("./src/insults.json").insults
  if (
    req.query.text.length > 0 &&
    insultList.filter((insults) => insults.text.includes(req.query.text))
      .length > 0
  ) {
    insultList = insultList.filter((insults) =>
      insults.text.includes(req.query.text)
    )
  }
  if (
    req.query.origin.length > 0 &&
    insultList.filter((insults) => insults.origin.includes(req.query.origin))
      .length > 0
  ) {
    insultList = insultList.filter((insults) =>
      insults.origin.includes(req.query.origin)
    )
  }
  if (req.query.severity.length > 0) {
    insultList = insultList.filter(
      (insults) => insults.severity == req.query.severity
    )
  }
  res.render("index", {
    insult: insultList[0],
  })
})

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})
