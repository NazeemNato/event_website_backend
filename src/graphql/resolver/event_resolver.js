const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const Event = require("../../models/Event");
const User = require("../../models/User");

const resolver = {
  Query: {
    events: async () => {
      const events = await Event.find().sort({ _id: -1 });
      console.log(events);
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
        };
      });
    },
  },
  Mutation: {
    createEvent: async (_, args, context) => {
      let errors = {};
      const { title, description, location, date, price } = args.input;
      try {
        if (!context.data) {
          throw new AuthenticationError("Unauthenticated");
        }
        const creator = await User.findById(context.data.id);

        if (!creator) {
          throw new AuthenticationError("User not found");
        }

        if (title.trim() === "") errors.title = "title must not be empty";

        if (description.trim() === "")
          errors.description = "description must not be empty";

        if (location.trim() === "")
          errors.location = "location must not be empty";

        if (date.trim() === "") errors.date = "date must not be empty";

        if (price === null || price === undefined)
          errors.price = "price must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }

        const event = Event({
          title,
          description,
          location,
          price,
          createdBy: context.data.id,
        });

        let data = await event.save();

        creator.events.push(data);
        await creator.save();

        return {
          message: "Event added",
          status: 201,
        };
      } catch (e) {
        throw e;
      }
    },
  },
};

module.exports = resolver;
