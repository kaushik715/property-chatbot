const chatArea = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessage(message, sender = "ai") {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message");
  messageEl.classList.add(sender === "user" ? "user-message" : "ai-message");
  messageEl.textContent = message;
  chatArea.appendChild(messageEl);
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {
  const prompt = userInput.value.trim();
  if (!prompt) return;
  addMessage(prompt, "user");
  userInput.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    addMessage(data.response || "Something went wrong.");
  } catch (err) {
    addMessage("Error: " + err.message);
  }
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
