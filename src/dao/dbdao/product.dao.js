import { productModel } from "../models/product.model.js";

export default class ProductMongoDAO {
  constructor() {
    this.collection = productModel;
  }

  async get(
    limit = 10,
    page = 1,
    category = false,
    status = false,
    sort = false
  ) {
    let filter = {};
    let labels = {
      docs: "payload",
      totalDocs: false,
    };
    let options = { lean: true, page, limit, sort, customLabels: labels };

    if (category) {
      filter = { ...filter, category };
    }
    if (status) {
      filter = { ...filter, status };
    }

    if (sort === "asc") {
      options.sort = { price: 1 };
    }
    if (sort === "desc") {
      options.sort = { price: -1 };
    }

    return await this.collection.paginate(filter, options);
  }

  async getById(pid) {
    return await this.collection.findById(pid).lean();
  }

  async add(product) {
    return await this.collection.create(product);
  }

  async update(pid, product) {
    return await this.collection.findByIdAndUpdate(
      pid,
      { $set: product },
      { new: true }
    );
  }

  async delete(pid) {
    return await this.collection.findByIdAndDelete(pid);
  }
}
