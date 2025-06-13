const http = require("http");
const WebSocket = require("ws");

// Usa a porta definida pelo Render ou 3000 localmente
const PORT = process.env.PORT || 3000;

// Cria o servidor HTTP base
const server = http.createServer();

// Cria o servidor WebSocket atrelado ao HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("Novo cliente conectado");

  ws.on("message", function incoming(data) {
    console.log("Mensagem recebida:", data);

    // Reenvia para todos os clientes conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", function () {
    console.log("Cliente desconectado");
  });
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor WebSocket ativo na porta ${PORT}`);
});
