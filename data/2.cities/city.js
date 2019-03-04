const faker = require('faker')

const json = [
  {
    name: 'San Francisco',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    name: 'New York',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    name: 'Chicago',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = json
