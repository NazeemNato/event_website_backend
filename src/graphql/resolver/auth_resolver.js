require("dotenv").config();

const { UserInputError } = require("apollo-server-express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const resolver = {
  Mutation: {
    login: async (_, args) => {
      let errors = {};
      const { email, password } = args.input;
      try {
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (password.trim() === "")
          errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new UserInputError("User not found", { errors });
        }
        const checkpwd = await bcryptjs.compare(password, user.password);
        if (!checkpwd) {
          throw new UserInputError("Invalid password", { errors });
        }
        const token = jwt.sign({id: user.id, email }, process.env.CODE, {
          expiresIn: "1d",
        });
        return { token };
      } catch (e) {
        throw e;
      }
    },
    register: async (_, args) => {
      const { fullName, email, password } = args.input;
      let errors = {};
      try {
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (fullName.trim() === "") errors.fullName = "name must not be empty";
        if (password.trim() === "")
          errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }
        const user = await User.findOne({ email });
        if (user) {
          throw new UserInputError("Email already taken", { errors });
        }
        let hashpassword = await bcryptjs.hash(password, 6);
        const newUser = User({
          fullName,
          email,
          password: hashpassword,
        });
       let u =  await newUser.save();
        const token = jwt.sign({id: u.id, email }, process.env.CODE, {
          expiresIn: "1d",
        });
        return { token };
      } catch (e) {
        throw e;
      }
    },
  },
};

module.exports = resolver;
