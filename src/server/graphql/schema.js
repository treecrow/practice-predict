const db = require('../db')

const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql')

// Fields
const queryFields = require('./queryFields')
const mutationFields = require('./mutationFields')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'queryType',
    fields: queryFields
  }),
  mutation: new GraphQLObjectType({
    name: 'mutationType',
    fields: mutationFields
  })
})

module.exports = {
  schema
}
