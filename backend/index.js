const express = require('express')
const rest = require('./api')
const graphql = require('./graphql')

const port = process.env.PORT || 3030

express()
  .use('/api', rest)
  .use('/graphql', graphql)
  .listen(port, () => console.log(`Backend listening on port ${port}!`))
