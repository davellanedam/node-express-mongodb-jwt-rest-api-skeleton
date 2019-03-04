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
const createdID = []
let verification = ''
let verificationForgot = ''
const email = faker.internet.email()

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
  describe('/POST login', () => {
    it('it should GET token', done => {
      chai
        .request(server)
        .post('/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('token')
          done()
        })
    })
  })

  describe('/POST register', () => {
    it('it should POST register', done => {
      const user = {
        name: faker.random.words(),
        email,
        password: faker.random.words()
      }
      chai
        .request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.include.keys('token', 'user')
          createdID.push(res.body.user._id)
          verification = res.body.user.verification
          done()
        })
    })
    it('it should NOT POST a register if email already exists', done => {
      const user = {
        name: faker.random.words(),
        email,
        password: faker.random.words()
      }
      chai
        .request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/POST verify', () => {
    it('it should POST verify', done => {
      chai
        .request(server)
        .post('/verify')
        .send({
          id: verification
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.include.keys('email', 'verified')
          res.body.verified.should.equal(true)
          done()
        })
    })
  })

  describe('/POST forgotPassword', () => {
    it('it should POST forgotPassword', done => {
      chai
        .request(server)
        .post('/forgot')
        .send({
          email
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.include.keys('msg', 'verification')
          verificationForgot = res.body.verification
          done()
        })
    })
  })

  describe('/POST resetPassword', () => {
    it('it should POST resetPassword', done => {
      chai
        .request(server)
        .post('/reset')
        .send({
          id: verificationForgot,
          password: '12345'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
          done()
        })
    })
  })

  after(() => {
    createdID.forEach(id => {
      User.findByIdAndRemove(id, err => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
