const { ApolloServer, gql } = require('apollo-server-express')
const { companies, users } = require('./database.json')

const typeDefs = gql`
  type User {
    _id: String!
    name: String!
    email: String!
    phone: String!
    company: Company!
  }

  type Company {
    _id: String!
    name: String!
    website: String!
    numberOfEmployees: Int!
    contact: User!
  }

  type Query {
    companies: [Company!]!
    company (id: String!): Company
    users: [User!]!
    user (id: String!): User
  }
`

const resolvers = {
  Query: {
    companies: () => companies,
    company: (root, { id }) => companies.find(({ _id }) => _id === id),
    users: () => users,
    user: (root, { id }) => users.find(({ _id }) => _id === id)
  },

  Company: {
    contact: ({ contact }) => users.find(({ _id }) => _id === contact),
  },

  User: {
    company: user => companies.find(({ _id }) => _id === user._id)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

module.exports = server.getMiddleware({ path: '/' })
