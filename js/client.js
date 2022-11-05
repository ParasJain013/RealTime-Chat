const socket = io("http://localhost:8000");

const form = document.getElementById("send_container");
const message = document.getElementById("messageinp");
const messageContainer = document.querySelector(".main");

var audio = new Audio("Notification.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left" || position == "center") {
    audio.play();
  }
};

let newUser = prompt("Enter Your Name To Join");
socket.emit("new-user-joined", newUser);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message_send = message.value;
  append(`You : ${message_send}`, "right");
  socket.emit("send", message_send);
  message.value = "";
});

socket.on("user-joined", (newUser) => {
  append(`${newUser} joined the chat`, "center");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "center");
});
