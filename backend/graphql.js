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

  input UserInput {
    name: String
    email: String
    phone: String
  }

  type Company {
    _id: String!
    name: String!
    website: String!
    numberOfEmployees: Int!
    contact: User!
  }

  input CompanyInput {
    name: String
    website: String
    numberOfEmployees: Int
  }

  type Query {
    companies: [Company!]!
    company(id: String!): Company
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    addCompany(company: CompanyInput!, contact: UserInput!): Company!
    updateCompany(id: String!, company: CompanyInput): Company!
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
    contact: ({ contact }) => users.find(({ _id }) => _id === contact)
  },

  User: {
    company: user => companies.find(({ _id }) => _id === user._id)
  },

  Mutation: {
    addCompany: (root, { company, contact }) => {
      if (companies.find(({ name }) => name === company.name)) {
        throw new Error(`Company "${company.name}" already exists`)
      }

      if (
        users.find(
          user => user.name === contact.name || user.email === contact.email
        )
      ) {
        throw new Error(`User "${contact.name}" already exists`)
      }

      const newUser = { _id: `${users.length}`, ...contact }

      const newCompany = {
        _id: `${companies.length}`,
        ...company,
        contact: newUser._id
      }

      users.push(newUser)
      companies.push(newCompany)

      return newCompany
    },

    updateCompany: (root, { id, company }) => {
      const current = companies.find(({ _id }) => _id === id)

      if (!current) {
        throw new Error('Company not found')
      }

      for (const prop in company) {
        current[prop] = company[prop]
      }

      return current
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

module.exports = server.getMiddleware({ path: '/' })
