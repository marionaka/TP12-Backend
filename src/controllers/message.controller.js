//import { messagesPersist } from "../dao/factory/factory.js";
import MessageMongoDAO from "../dao/dbdao/message.dao.js";

class MessageController {
    constructor(){
        this.dao = new MessageMongoDAO();
    }

    async get(){
        return await this.dao.get();
    }

    async add(message){
        return await this.dao.add(message);
    }

    async delete(mid){
        return await this.dao.delete(mid)
    }
}

const messageController = new MessageController();
export default messageController;