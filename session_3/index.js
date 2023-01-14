const express = require("express");
const app = express();

app.use(express.static("../gol"));

app.get("/game", function(req, resp){
    resp.redirect("/index.html");
})

app.get("/", function(req, resp){
    resp.send("Target locked");
});

app.get("/name/:name", function(req, resp){
    let name = req.params.name;
    resp.send("<h1>Hello " + name +"</h1>");
 });

app.get("/google/:search", function(req, resp){
    let search = req.params.search;
    resp.redirect("https://google.com/search?q=" + search);
})

app.get("/*", function(req, resp){
    resp.status(404).send("<h1> Error 404 </h1>");
})

app.listen(3000, function(){
    console.log("Terminator activated");
});