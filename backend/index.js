const express = require('express')

const port = process.env.PORT || 3030

express()
  .get('/status', (req, res) => res.send('ok'))
  .listen(port, () => console.log(`Backend listening on port ${port}!`))
