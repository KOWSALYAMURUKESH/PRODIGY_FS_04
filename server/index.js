const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3001 }, () => {
  console.log("WebSocket server is running on ws://localhost:3001");
});

server.on("connection", (ws) => {
  ws.send(JSON.stringify({ text: "Welcome to the chat!", clientId: "server" }));

ws.on("message", (message) => {
  const text = message.toString(); // Convert Buffer to string
  console.log("Received string:", text) 

  try {
    const data = JSON.parse(text); // Parse JSON object
    console.log("Parsed object:", data);

    // Broadcast to all clients (including sender)
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
    });
  } catch (err) {
    console.error("❌ Failed to parse message:", err);
  }
})


})
