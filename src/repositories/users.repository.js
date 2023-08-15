import UserDTO from "../dto/user.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async get() {
        return await this.dao.get();
      }
    
      async getByEmail(email) {
        return await this.dao.getByEmail(email);
      }
    
      async getById(id) {
        const user = await this.dao.getById(id);
        const userDTO = new UserDTO(user);
        return userDTO;
      }
    
      async add(userData) {
        if (
          !userData.first_name ||
          !userData.last_name ||
          !userData.email ||
          !userData.password
        ) {
          throw new Error("Campos incompletos");
        }
        return await this.dao.add(userData);
      }
}