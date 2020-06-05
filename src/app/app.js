const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.get("/users", (req, res) => {
  res.send("GET users")
})

app.listen(1600, () => {
  console.log("API started")
})
