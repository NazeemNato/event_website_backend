const auth_resolver = require("./auth_resolver")

module.exports = {
    Query: {
        hello: ()=> "Hello World"
    },
    Mutation: {
        ...auth_resolver.Mutation
    }
}