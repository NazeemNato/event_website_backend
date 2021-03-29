require("dotenv").config();

const Event = require("../src/models/Event");
const User = require("../src/models/User");
const mongoose = require("mongoose");


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(async () => {
      console.log("DB Connected");
      const event = await testFun();
      console.log(event);
  })
  .catch((e) => {
    console.log(e);
  });


const testFun = async () => {
    const events = await Event.find({}).sort({ _id: -1 }).populate({
        path: "createdBy",
        model: "User"
    }).exec()
    return events;
}
