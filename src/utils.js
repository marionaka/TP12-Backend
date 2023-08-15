import { Server } from "socket.io";
import express from "express";

//Montaje del servidor en express y el socket para permitir exportar el socket a otros módulos.
const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
const io = new Server(httpServer);

export {app, io};