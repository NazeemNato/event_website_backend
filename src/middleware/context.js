require("dotenv").config();

const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub();

const middleware = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split("Bearer ")[1];
    }
    if (token) {
        jwt.verify(
          token,
          process.env.CODE,
          (_, decodedToken) => {
            context.data = decodedToken;
          }
        );
      }
    
      context.pubsub = pubsub;
    
      return context;
};


module.exports = middleware