// Create user models and Schemas here

import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://shubhamsarpate6_db_user:jkHuNqwZ4vvWfLUV@cluster0.oh0il7j.mongodb.net/");

const UserSchema = new Schema({
    username: {type:String, unique: true},
    password: String
})

// mew syntax
export const UserModel = model("User", UserSchema);


const contentSchema = new Schema({
    title: String,
    link: String,
    type: String,

    tag: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true},
})

export const LinkModel = model("Content", LinkSchema)
export const ContentModel = model("Content", contentSchema);






// old syntax
// module.exports = {

// }