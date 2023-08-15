import { messageModel } from "../models/message.model.js"

export default class MessageMongoDAO {
    constructor(){
        this.model = messageModel;
    }

    async get(){
        return await messageModel.find().lean();
    }

    async add(message){
        return await messageModel.create(message);
    }

    async delete(mid){
        return await messageModel.findByIdAndDelete(mid)
    }
}
