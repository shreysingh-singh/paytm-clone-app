import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema ({
    email: {type: String , unique: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String}
});

export const Usermodel = model("User", UserSchema);