const queryList = [
  '{__schema { queryType { name, fields { name, description, args {name}} }}}',
  '{__schema { mutationType { name, fields { name, description, args {name}} }}}',
  '{__schema { types { name, fields { name, description} }}}',
]
module.exports = {
  queryList
}
