import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

// get all admins 
export async function getAllAdmins(req, res, next) {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    await Admin.paginate({}, options)
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((err) => res.status(404).json({ success: false, err }));
  } catch (error) {
    return next(error.message);
  }
}

// get admin by id
export async function getAdminById(req, res, next) {
  try {
    const { adminId } = req.params;
    await Admin.findById(adminId)
      .then((response) => {
        if (response) {
          response.password = undefined;
          res.status(200).json({
            success: true,
            response,
            imagePath: `http://localhost:${process.env.PORT}/${response.image}`,
          });
        } else {
          res.status(404).json({ success: false, message: "Admin not found" });
        }
      })
      .catch((err) =>
        res
          .status(404)
          .json({ success: false, message: "Admin not found", err })
      );
  } catch (err) {
    return next(err);
  }
}

// register a new admin account (as either admin or super admin)
export async function register(req, res, next) {
  try {
    let { username, email, password, image } = req.body;
    let role;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Email is required for registration",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password,
      role,
      image: image || "",
      role: "user",
    });

    await admin
      .save()
      .then((response) => {
        // const token = "batata"
        const token = jwt.sign(
          {
            user_id: response._id,
            username,
            password,
            email,
            role: admin.role,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "5h" }
        );
        response.password = undefined;
        res.status(200).json({ success: true, response, token });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({
            success: false,
            err: "Email   already in use",
          });
        } else {
          return res.status(500).json({ success: false, err });
        }
      });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

// update admin by id
export async function updateAdmin(req, res, next) {
  try {
    const { adminId } = req.params;
    const { username, email, password } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }
    if (req.file) {
      const admin = await Admin.findById(adminId);
      if (admin.image) {
        // Delete previous image if it exists
        fs.unlink(admin.image, (err) => {
          if (err) console.log(err);
        });
      }
      updates.image = req.file.path;
    }

    await Admin.findByIdAndUpdate(adminId, updates, { new: true })
      .then((response) => {
        if (response) {
          response.password = undefined;
          res.status(200).json({ success: true, response });
        } else {
          res.status(404).json({ success: false, message: "Admin not found" });
        }
      })
      .catch((err) =>
        res
          .status(404)
          .json({ success: false, message: "Admin not found", err })
      );
  } catch (err) {
    return next(err);
  }
}

//Delete an admin
export const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (admin.image) {
      // Delete admin's image if it exists
      fs.unlink(admin.image, (err) => {
        if (err) console.log(err);
      });
    }

    await Admin.findByIdAndRemove(adminId);

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

// Login
export async function login(req, res, next) {
  try {
    let { password, username } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All inputs are required" });
    }
    await Admin.findOne({ username }).then(async (response) => {
      if (response && (await bcrypt.compare(password, response.password))) {
        const token = jwt.sign(
          {
            user_id: response._id,
            username: response.username,
            // role: response.role,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "5h" }
        );
        response.password = undefined;
        // res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
        res.status(200).json({ sucess: true, response, token });
      } else {
        res.status(400).json({
          sucess: false,
          err: "Invalid Credentials",
        });
      }
    });
  } catch (err) {
    return next(err);
  }
}

// Logout
export const logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
};
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg, jpeg & png file supported");
      callback(null, false);
    }
  },
}).single("image");

export default upload;