const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

initializeSocket(server);

const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log("server running at port :", port);
});
