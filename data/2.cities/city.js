const faker = require('faker')

const json = [{
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

for (let i = 0; i < 100; i++) {
  const tmp = {
    name: faker.random.words(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
  json.push(tmp)
}

module.exports = json
