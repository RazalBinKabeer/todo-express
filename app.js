const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let day = "";
let todoInputs = [];

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

    res.render("list", { kindOfDay: day, newTodoInputs: todoInputs });
});

app.post("/", (req, res) => {
    var todoInput = req.body.todoInput;
    todoInputs.push(todoInput);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
