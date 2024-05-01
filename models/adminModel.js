import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

// validating the Email
let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: "username is required",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: "password is required",
    },
    image: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "superAdmin","user"],
      default: "admin",
    },
  },
  {
    timestamps: true,
    collection: "Admin",
  }
);

// hashing the password
adminSchema.pre("save", function (next) {
  bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(this.password, salt))
      .then((hashPassword) => {
          this.password = hashPassword;
          next();
      })
      .catch((err) => {
          next(err);
      });
});

adminSchema.plugin(mongoosePaginate);

const AdminModel = model("Admin", adminSchema);
AdminModel.paginate().then({});
export default AdminModel;