const express = require('express')
const database = require('./database.json')

const port = process.env.PORT || 3030

express()
  .get('/status', (req, res) => res.send('ok'))
  .get('/companies', (req, res) => res.json(database.companies))
  .listen(port, () => console.log(`Backend listening on port ${port}!`))
