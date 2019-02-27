/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const User = require('../app/models/user')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const email = faker.internet.email()
const createdID = []

chai.use(chaiHttp)

before(done => {
  setTimeout(() => {
    done()
  }, 50)
})
describe('*********** USERS ***********', () => {
  describe('/POST login', () => {
    it('it should GET token', done => {
      chai
        .request(server)
        .post('/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })
  describe('/GET users', () => {
    it('it should NOT be able to consume the route since no token was sent', done => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the users', done => {
      chai
        .request(server)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
  })
  describe('/POST user', () => {
    it('it should NOT POST a user without name', done => {
      const user = {}
      chai
        .request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a user ', done => {
      const user = {
        name: faker.random.words(),
        email,
        password: faker.random.words(),
        role: 'admin',
        urlTwitter: faker.internet.url(),
        urlGitHub: faker.internet.url(),
        phone: faker.phone.phoneNumber(),
        city: faker.random.words(),
        country: faker.random.words()
      }
      chai
        .request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'name', 'email', 'verification')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a user with email that already exists', done => {
      const user = {
        name: faker.random.words(),
        email,
        password: faker.random.words(),
        role: 'admin'
      }
      chai
        .request(server)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', done => {
      const user = new User({
        name: faker.random.words(),
        email: faker.internet.email(),
        password: faker.random.words(),
        role: 'admin'
      })
      user.save((err, result) => {
        if (result) {
          chai
            .request(server)
            .get(`/users/${result.id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((error, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('name')
              res.body.should.have.property('_id').eql(result.id)
              createdID.push(result._id)
            })
        }
        done()
      })
    })
  })
  describe('/PATCH/:id user', () => {
    it('it should UPDATE a user given the id', done => {
      const user = new User({
        name: faker.random.words(),
        email,
        password: faker.random.words(),
        role: 'admin'
      })
      user.save((err, result) => {
        if (result) {
          chai
            .request(server)
            .patch(`/users/${result.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              name: 'JS123456',
              email: 'emailthatalreadyexists@email.com',
              role: 'admin'
            })
            .end((error, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('_id').eql(result.id)
              res.body.should.have.property('name').eql('JS123456')
              createdID.push(result.id)
            })
        }
        done()
      })
    })
    it('it should NOT UPDATE a user with email that already exists', done => {
      const user = new User({
        name: faker.random.words(),
        email: 'admin@admin.com',
        password: faker.random.words(),
        role: 'admin'
      })
      chai
        .request(server)
        .patch(`/users/${createdID}`)
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          createdID.push(res.body._id)
          done()
        })
    })
  })
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', done => {
      const user = new User({
        name: faker.random.words(),
        email: faker.internet.email(),
        password: faker.random.words(),
        role: 'admin'
      })
      user.save((err, result) => {
        if (result) {
          chai
            .request(server)
            .delete(`/users/${result.id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((error, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('msg').eql('DELETED')
            })
        }
        done()
      })
    })
  })
})
after(() => {
  createdID.map(item => {
    return User.deleteOne(
      {
        _id: item
      },
      error => {
        if (error !== null) {
          console.log(error)
        }
      }
    )
  })
})
