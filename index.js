const express = require("express")
require("dotenv").config()
const fs = require("fs")

const app = express()
const PORT = process.env.Port || 3000

app.use(express.static("public"))
app.use(express.urlencoded())

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  let insultList = JSON.parse(
    fs.readFileSync("./src/insults.json", { encoding: "utf-8" })
  )
  console.log(insultList.insults)
  random = Math.floor(Math.random() * insultList.insults.length)
  res.render("index", {
    insult: insultList.insults[random],
  })
})

app.get("/search", (req, res) => {
  let insultList = JSON.parse(
    fs.readFileSync("./src/insults.json", { encoding: "utf-8" })
  ).insults
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

app.get("/postInsult", (req, res) => {
  const { id } = req.query
  if (id) {
    let insultList = JSON.parse(
      fs.readFileSync("./src/insults.json", { encoding: "utf-8" })
    ).insults
    res.render("insultPost", {
      insults: insultList.find((insult) => insult.id == id),
    })
  } else {
    res.render("insultPost", { insults: false })
  }
})

app.post("/postInsult", (req, res) => {
  //let insultList = require("./src/insults.json")
  let insultList = JSON.parse(
    fs.readFileSync("./src/insults.json", { encoding: "utf-8" })
  )
  const { id } = req.body
  if (
    req.body.text.length > 0 &&
    req.body.origin.length > 0 &&
    req.body.severity.length > 0
  ) {
    if (id) {
      let insult = insultList.insults.find((insults) => insults.id == id)
      //insult = { ...req.body }
      insult.text = req.body.text
      insult.origin = req.body.origin
      insult.severity = req.body.severity
      console.log(insultList.insults.find((insults) => insults.id == id))
    } else {
      insultList.insults.push({
        ...req.body,
        id: insultList.insults.length + 1,
      })
    }
    fs.writeFileSync("./src/insults.json", JSON.stringify(insultList))
    //es.redirect(201, "/")
    res.redirect("/")
  } else {
    res.render("insultPost")
  }
})

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})
