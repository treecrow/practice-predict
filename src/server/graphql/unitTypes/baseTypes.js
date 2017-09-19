const {
  GraphQLScalarType
} = require('graphql')

// const GraphQLDate = new GraphQLScalarType({
//   name: 'Date',
//   description: 'The `Date` scalar type represents Date type.',
//   serialize(value) {
//     return new Date(value)
//   },
//   parseValue(value) {
//     return new Date(value)
//   },
//   parseLiteral(ast) {
//     return ast.kind === Kind.DATE ? ast.value : null;
//   }
// })

module.exports = {
  // GraphQLDate
}
