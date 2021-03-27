const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # ************************** TYPES *************************** #
  type User {
    id: ID
    username: String!
    email: String
    events: [Event!]
  }

  type Event {
    id: ID
    imageUrl: String
    title: String
    description: String
    location: String
    date: String
    price: Float
    createdBy: User!
    createdOn: String
  }

  type Auth {
    token: String!
  }

  type Booking {
    id: ID
    user: User
    event: Event
    createdAt: String
    updatedAt: String
  }

  type Message {
    message: String!
    status: Int!
  }
  # ************************** INPUTS *************************** #
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
  }

  input CreateEvent {
    title: String
    description: String
    location: String
    date: String
    price: Float
  }

  # ************************** Query & Mutation *************************** #
  type Query {
    # events: [Event!]
    # bookings: [Booking!]
    hello: String
  }

  type Mutation {
    login(input: LoginInput): Auth!
    register(input: RegisterInput): Auth!
    # createEvent(input: CreateEvent): Message!
    # bookEvent(eventId: String!): Message!           
    # cancelEvent(eventId: String!): Message!                   
  }
`;

module.exports = typeDefs;
