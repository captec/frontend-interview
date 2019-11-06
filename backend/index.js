const express = require('express')
const rest = require('./api')

const port = process.env.PORT || 3030

express()
  .use('/api', rest)
  .listen(port, () => console.log(`Backend listening on port ${port}!`))
