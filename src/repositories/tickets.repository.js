import TicketDTO from "../dto/ticket.dto.js";

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async get() {
        return await this.dao.get();
      }
    
      async getByCode(code) {
        const ticket = await this.dao.getByCode(code);
        const ticketDTO = new TicketDTO(ticket);
        return ticketDTO;
      }
    
      async getById(id) {
        const ticket = await this.dao.getById(id);
        const ticketDTO = new TicketDTO(ticket);
        return ticketDTO;
      }
    
      async add(ticketData) {
        return await this.dao.add(ticketData);
      }
}