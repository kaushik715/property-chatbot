
document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-button");
  const userInput = document.getElementById("user-input");
  const chatArea = document.getElementById("chat-area");
  const loadingIcon = document.querySelector(".loading-icon");

  function appendMessage(message, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.textContent = message;
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = "";
    loadingIcon.style.display = "inline-block";

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        appendMessage(data.reply, "bot");
      } else {
        appendMessage("Error: Unable to get a response.", "bot");
      }
    } catch (error) {
      appendMessage("Error: " + error.message, "bot");
    } finally {
      loadingIcon.style.display = "none";
    }
  }

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});
