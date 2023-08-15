import { Router } from "express";
import messageController from "../controllers/message.controller.js"
import { isUser } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await messageController.get());
  } catch (err) {
    req.logger.error(`Error al obtener los mensajes: ${err}`)
    res.status(400).send(err);
  }
});

messageRouter.post("/", isUser, async (req, res) => {
  try {
    res.status(201).send(await messageController.add(req.body));
  } catch (err) {
    req.logger.error(`Error al postear nuevo mensaje: ${err}`)
    res.status(400).send(err);
  }
});

messageRouter.delete("/:mid", async (req, res) => {
  try {
    res.status(200).send(await messageController.delete(req.params.mid));
  } catch (err) {
    req.logger.error(`Error al eliminar un mensaje por ID: ${err}`)
    res.status(400).send(err);
  }
});

export default messageRouter;
