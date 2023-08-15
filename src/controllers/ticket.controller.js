import { ticketService } from "../repositories/repoIndex.js";

class TicketController {
  constructor() {
    this.service = ticketService;
  }

  async get() {
    return await this.service.get();
  }

  async getByCode(code) {
    return await this.service.getByCode(code);
  }

  async getById(id) {
    return await this.service.getById(id);
  }

  async add(ticketData) {
    return await this.service.add(ticketData);
  }
}

const ticketController = new TicketController();
export default ticketController;