import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

// validating the Email
let validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: "username is required",
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
        },
        country: {
            type: String,
            trim: true,
        },
        countryCallingCode: {
            type: Number,
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
        // role: {
        //     type: String,
        //     enum: ["user", "admin"],
        //     default: "user",
        // },
    },
    {
        timestamps: true,
        collection: "User",
    }
);

// hashing the password
userSchema.pre("save", function (next) {
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

// adding the pagination plugin
userSchema.plugin(mongoosePaginate);

const User = model("User", userSchema);
export default User;

