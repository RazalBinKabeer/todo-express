const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let day = "";
let todoInputs = [];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleString("en-US", options);

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
    res.render("list", { listTitle: "Work List", newTodoInputs: workItems });
});

// app.post("/work", (req, res) => {
//     let item = req.body.todoInput;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
