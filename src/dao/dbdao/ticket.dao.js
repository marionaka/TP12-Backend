import ticketModel from "../models/ticket.model.js";

export default class TicketMongoDAO {
  constructor() {
    this.collection = ticketModel;
  }

  async get() {
    return await this.collection.find();
  }

  async getByCode(code) {
    return await this.collection.findOne({ code: code });
  }

  async getById(id) {
    return await this.collection.findById(id).lean();
  }

  async add(userData) {
    return await this.collection.create(userData);
  }

  async delete(id) {
    return await this.collection.findByIdAndDelete(id);
  }
}
