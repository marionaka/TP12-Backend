import userModel from "../models/user.model.js";

export default class UserMongoDAO {
  constructor() {
    this.collection = userModel;
  }

  async get() {
    return await this.collection.find();
  }

  async getByEmail(email) {
    return await this.collection.findOne({ email: email });
  }

  async getById(id) {
    return await this.collection.findById(id).lean();
  }

  async add(userData) {
    return await this.collection.create(userData);
  }
}
