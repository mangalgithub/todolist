const express = require("express");
const bodyParser = require("body-parser");
let items = ["Buy Food", "Buy Grocery", "Work"];
let workItem = [];
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItem: workItem });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItem.push(item);
  res.redirect("/work");
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItem.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.listen(port, (req, res) => {
  console.log("Server is running on port 3000");
});
