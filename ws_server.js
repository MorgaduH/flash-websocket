
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on("connection", function connection(ws) {
  clients.push(ws);

  ws.on("message", function incoming(message) {
    // Envia a mensagem recebida para todos os outros clientes
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on("close", () => {
    clients = clients.filter(client => client !== ws);
  });
});

console.log("Servidor WebSocket rodando na porta " + PORT);
