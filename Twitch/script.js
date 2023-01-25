function main(){
    const socket = io();

    console.log("ready to roast...");

    let buttom = document.getElementById("send_btn");
    let input = document.getElementById("input_message");
    let chatDiv = document.getElementById("chat");

    function handleSubmit(){
        console.log("button clicked");
        let message = input.value;
        if(message !== ""){
            socket.emit("send roast", message);
            input.value = "";
        }
    }

    function handleMessage(msg){
        let p = document.createElement("p");
        p.innerText = msg;
        chatDiv.appendChild(p);
    }

    buttom.onclick = handleSubmit;
    socket.on("display roast", handleMessage);
}

window.onload = main;