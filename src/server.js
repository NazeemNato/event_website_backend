require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");
const ctx = require("./middleware/context")

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx
});

app.get("/", (_, res) => {
  res.send(`Hello World 👋`);
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("🌔 Database connected");
    return app.listen(PORT, () => {
      console.log(
        `🚀 Graphql Server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })
  .catch((e) => {
    console.log(e);
  });
