const express = require("express");
const app = express();

app.get("/", function(req, resp){
    resp.send("Target locked");
});

app.get("/name/:name", function(req, resp){
    let name = req.params.name;
    resp.send("<h1>Hello " + name +"</h1>");
 });

app.listen(3000, function(){
    console.log("Terminator activated");
}); 