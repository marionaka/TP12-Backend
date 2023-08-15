import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js"

const ticketRouter = Router();

ticketRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await ticketController.get());
  } catch (err) {
    req.logger.error(`Error al obtener los tickets: ${err}`)
    res.status(400).send(err);
  }
});

ticketRouter.get("/:tcode", async (req, res) => {
    try {
      res.status(200).send(await ticketController.getByCode(req.params.tcode));
    } catch (err) {
      req.logger.error(`Error al obtener el ticket por ID: ${err}`)
      res.status(400).send(err);
    }
  });

ticketRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await ticketController.add(req.body));
  } catch (err) {
    req.logger.error(`Error al crear un ticket: ${err}`)
    res.status(400).send(err);
  }
});

ticketRouter.delete("/:tid", async (req, res) => {
  try {
    res.status(200).send(await ticketController.delete(req.params.mid));
  } catch (err) {
    req.logger.error(`Error al eliminar un ticket: ${err}`)
    res.status(400).send(err);
  }
});

export default ticketRouter;
