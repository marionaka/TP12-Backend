import { userService } from "../repositories/repoIndex.js";

class UserController {
  constructor() {
    this.service = userService;
  }

  async get() {
    return await this.service.get();
  }

  async getByEmail(email) {
    return await this.service.getByEmail(email);
  }

  async getById(id) {
    return await this.service.getById(id);
  }

  async add(userData) {
    return await this.service.add(userData);
  }
}

const userController = new UserController();
export default userController;