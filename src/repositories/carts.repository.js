import CartDTO from "../dto/cart.dto.js";

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async get() {
    return await this.dao.get();
  }

  async getById(id) {
    const cart = await this.dao.getById(id);
    const cartDTO = new CartDTO(cart);
    return cartDTO;
  }

  async add(cart) {
    return await this.dao.add(cart);
  }

  async update(cid, cart) {
    return await this.dao.update(cid, cart);
  }

  async addProdtoCart(cid, pid) {
    return await this.dao.addProdtoCart(cid, pid);
  }

  async deleteProdfromCart(cid, pid) {
    return await this.dao.deleteProdfromCart(cid, pid);
  }

  async deleteAllProds(cid) {
    return await this.dao.deleteAllProds(cid);
  }

  async updateProdfromCart(cid, pid, quantity) {
    return await this.dao.updateProdfromCart(cid, pid, quantity);
  }
}