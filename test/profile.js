/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const User = require('../app/models/user')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const createdID = []

chai.use(chaiHttp)

before(done => {
  setTimeout(() => {
    done()
  }, 10)
})
describe('*********** PROFILE ***********', () => {
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
  describe('/GET profile', () => {
    it('it should NOT be able to consume the route since no token was sent', done => {
      chai
        .request(server)
        .get('/profile')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET profile', done => {
      chai
        .request(server)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('name', 'email')
          done()
        })
    })
  })
  describe('/PATCH profile', () => {
    it('it should NOT UPDATE profile empty name/email', done => {
      const user = {}
      chai
        .request(server)
        .patch('/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should UPDATE profile', done => {
      const user = {
        name: 'Test123456',
        email: 'admin@admin.com'
      }
      chai
        .request(server)
        .patch('/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name').eql('Test123456')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT UPDATE profile with email that already exists', done => {
      const user = {
        email: 'programmer@programmer.com'
      }
      chai
        .request(server)
        .patch('/profile')
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
})
after(() => {
  createdID.map(item => {
    return User.remove(
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
