//import { productsPersist } from "../dao/factory/factory.js";
import { productService } from "../repositories/repoIndex.js";

class ProductController {
  constructor() {
    this.service = productService;
  }

  async get() {
    return await this.service.get();
  }

  async getById(pid) {
    return await this.service.getById(pid);
  }

  async add(product) {
    return await this.service.add(product);
  }

  async update(pid, product) {
    return await this.service.update(pid, product);
  }

  async deleteProduct(pid) {
    return await this.service.delete(pid);
  }
}

const productController = new ProductController();
export default productController;
