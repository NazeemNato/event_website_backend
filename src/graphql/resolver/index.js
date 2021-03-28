const auth_resolver = require("./auth_resolver")
const event_resolver = require("./event_resolver")

module.exports = {
    Query: {
        hello: ()=> "Hello World",
        ...event_resolver.Query
    },
    Mutation: {
        ...auth_resolver.Mutation,
        ...event_resolver.Mutation
    }
}