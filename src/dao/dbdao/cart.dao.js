import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js"

export default class CartMongoDAO {
  constructor() {
    this.collection = cartModel;
  }

  async get() {
    return await this.collection.find().lean();
  }

  async getById(cid) {
    return await this.collection.findById(cid).populate("products.product", "-__v").lean();
  }

  async add(cart) {
    return await this.collection.create(cart);
  }

  async update(cid, cart) {
    return await this.collection.findByIdAndUpdate(
      cid,
      { $set: cart },
      { new: true }
    );
  }

  async addProdtoCart(cid, pid) {
    try {
      //Se trae la lista de carritos y se busca el que corresponde según el id
      let selectedCart = await this.getById(cid);

      //Se trae la lista de productos y se busca el que corresponde según el id
      let selectedProduct = await productModel.findById(pid);

      let existingProduct = selectedCart.products.find((prod) => {
        return prod.product._id.toString() === selectedProduct._id.toString();
      });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        selectedCart.products.push({
          product: selectedProduct._id,
          quantity: 1,
        });
      }

      await this.update(cid, selectedCart);
    } catch (err) {
      console.log(`Error al agregar el producto al carrito por ID: ${err}`);
    }
  } 

    async deleteProdfromCart(cid, pid) {
    try {
      await this.collection.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return {success: true, message: "Producto eliminado del carrito"}
    } catch (err) {
      console.log(`Error al borrar el producto del carrito por ID: ${err}`);
    }
  }

  async deleteAllProds(cid) {
    try {
      await this.collection.updateOne({ _id: cid }, { $set: { products: [] } });
    } catch (err) {
      console.log(`Error al borrar los productos del carrito: ${err}`);
    }
  }

  async updateProdfromCart(cid, pid, quantity) {
    try {
      await this.collection.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity.quantity } }
      );
    } catch (err) {
      console.log(
        `Error actualizando la cantidad del producto del carrito: ${err}`
      );
    }
  }

}
