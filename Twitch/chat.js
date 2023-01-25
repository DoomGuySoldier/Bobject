const express = require("express");
const app = express();

let httpServer = require("http").Server(app);

let {Server} = require("socket.io");
const io = new Server(httpServer);

app.use(express.static("./"));

app.get("/", function(req, resp){
    resp.redirect("index.html");
});

httpServer.listen(3000, function(){
    console.log("Server started - waiting for Port 3000 ");
});

let roasts = [];

//WS Handlung
io.on("connection", function(socket){
    console.log("ws connection established");

    for(let i = 0; i < roasts.length; i++){
        socket.emit("display roast", roasts[i]);
    }

    socket.on("send roast", function(data){
        roasts.push(data);
        //sendet an alle clients
        io.emit("display roast", data);
        console.log(roasts);
    });

    socket.on("disconnect", function(reason){
        console.log("disconnect because of: ", reason);
    })
});