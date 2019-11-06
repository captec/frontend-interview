const express = require('express')
const { companies, users } = require('./database.json')

const port = process.env.PORT || 3030

express()
  /**
   * Check if API is running.
   */
  .get('/status', (req, res) => res.send('ok'))

  /**
   * Retrieve all companies.
   */
  .get('/companies', (req, res) => res.json(companies))

  /**
   * Return a single company.
   */
  .get('/companies/:company', (req, res) => {
    const company = companies.find(({ _id }) => _id === req.params.company)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    res.json(company)
  })

  /**
   * Return a company's contact user.
   */
  .get('/companies/:company/contact', (req, res) => {
    const company = companies.find(({ _id }) => _id === req.params.company)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    const contact = users.find(({ _id }) => _id === company.contact)

    if (!contact) {
      return res.status(404).json({ message: 'Company has no contact' })
    }

    res.json(contact)
  })

  /**
   * Retrieve all users.
   */
  .get('/users', (req, res) => res.json(users))

  /**
   * Return a single user.
   */
  .get('/users/:user', (req, res) => {
    const user = users.find(({ _id }) => _id === req.params.user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  })

  /**
   * Return the company a user is the contact for.
   */
  .get('/users/:user/company', (req, res) => {
    const user = users.find(({ _id }) => _id === req.params.user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const company = companies.find(({ contact }) => contact === user._id)

    if (!company) {
      return res.status(404).json({ message: 'User has no company' })
    }

    res.json(company)
  })

  .listen(port, () => console.log(`Backend listening on port ${port}!`))
