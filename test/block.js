/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const User = require('../app/models/user')

const badUser = {
  name: 'Bad user',
  email: 'bad@user.com',
  password: '54321'
}
const badLoginDetails = {
  email: 'bad@user.com',
  password: '12345'
}
const createdID = []

chai.use(chaiHttp)
describe('*********** BLOCK ***********', () => {
  it('it should POST register', (done) => {
    chai
      .request(server)
      .post('/register')
      .send(badUser)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.should.include.keys('token', 'user')
        createdID.push(res.body.user._id)
        done()
      })
  })
})

describe('/POST login', () => {
  it('it should NOT POST login after password fail #1', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('WRONG_PASSWORD')
        done()
      })
  })
  it('it should NOT POST login after password fail #2', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('WRONG_PASSWORD')
        done()
      })
  })
  it('it should NOT POST login after password fail #3', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('WRONG_PASSWORD')
        done()
      })
  })
  it('it should NOT POST login after password fail #4', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('WRONG_PASSWORD')
        done()
      })
  })
  it('it should NOT POST login after password fail #5', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('WRONG_PASSWORD')
        done()
      })
  })
  it('it should NOT POST login after password fail #6 and be blocked', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('BLOCKED_USER')
        done()
      })
  })
  it('it should NOT POST login after being blocked sending post with correct password', (done) => {
    chai
      .request(server)
      .post('/login')
      .send({
        email: badUser.email,
        password: badUser.password
      })
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').that.has.property('msg')
        res.body.errors.should.have.property('msg').eql('BLOCKED_USER')
        done()
      })
  })
})

after(() => {
  createdID.forEach((id) => {
    User.findByIdAndRemove(id, (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
})
