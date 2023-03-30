var socketio = io(); 

const messages = document.getElementById("messages")
const createMessage = (name, msg) => {
    const content = `
    <div class="text">
        <span>
            <strong>${name}</strong>: ${msg}
        </span>
        <span class="muted">
            ${new Date().toDateString()}
        </span>
    </div>
    `;
    messages.innerHTML += content;
};

socketio.on("message", (data) => {
    createMessage(data.name, data.message);
})

// sending messages
const sendMessage = () => {
const message = document.getElementById("message");
if(message.value == "") return;
socketio.emit("message", {data: message.value})
message.value = ""
};

module.exports= {
    createMessage,
    sendMessage
}