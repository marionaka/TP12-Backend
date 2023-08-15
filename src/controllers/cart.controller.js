//import { cartsPersist } from "../dao/factory/factory.js";
import { cartService } from "../repositories/repoIndex.js";

class CartController {
  constructor() {
    this.service = cartService;
  }

  async get() {
    return await this.service.get();
  }

  async getById(cid) {
    return await this.service.getById(cid);
  }

  async add(cart) {
    return await this.service.add(cart);
  }

  async update(cid, cart) {
    return await this.service.update(cid, cart);
  }

  async addProdtoCart(cid, pid) {
    return await this.service.addProdtoCart(cid, pid);
  }

  async deleteProdfromCart(cid, pid) {
    return await this.service.deleteProdfromCart(cid, pid);
  }

  async deleteAllProds(cid) {
    return await this.service.deleteAllProds(cid);
  }

  async updateProdfromCart(cid, pid, quantity) {
    return await this.service.updateProdfromCart(cid, pid, quantity);
  }

}

const cartController = new CartController();
export default cartController;