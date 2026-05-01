import mongoose, { model, Schema } from "mongoose";


const UserSchema = new Schema ({
    email: {type: String , unique: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String}
});

const AccountSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId ,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }

});
export const Usermodel = model("User", UserSchema);
export const Accountmodel = model("Account", AccountSchema);