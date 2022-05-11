const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);

const app = express();
// let day = "";
const todoInputs = [];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let day = date.getDate();
    res.render("list", { listTitle: day, newTodoInputs: todoInputs });
});

app.post("/", (req, res) => {
    let todoInput = req.body.todoInput;

    if (req.body.list === "Work") {
        workItems.push(todoInput);
        res.redirect("/work");
    } else {
        todoInputs.push(todoInput);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newTodoInputs: workItems });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
