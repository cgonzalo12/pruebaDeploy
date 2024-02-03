const socket = io();
let user;
let chatBox = document.getElementById("chatBox");
Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa tu usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("login", user);
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });
  log.innerHTML = messages;
});

socket.on("register", (data) => {
  Swal.fire({
    title: "Se registro un nuevo ususario",
    text: `El nombre del ususario es ${data} `,
    icon: "success",
    toast: true,
  });
});
