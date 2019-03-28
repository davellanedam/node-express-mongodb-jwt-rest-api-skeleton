/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const City = require('../app/models/city')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const createdID = []
const name = faker.random.words()
const newName = faker.random.words()
const repeatedName = faker.random.words()

chai.use(chaiHttp)

describe('*********** CITIES ***********', () => {
  describe('/POST login', () => {
    it('it should GET token', done => {
      chai
        .request(server)
        .post('/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/GET cities', () => {
    it('it should NOT be able to consume the route since no token was sent', done => {
      chai
        .request(server)
        .get('/cities')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the cities', done => {
      chai
        .request(server)
        .get('/cities')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the cities with filters', done => {
      chai
        .request(server)
        .get('/cities?filter=Bucaramanga&fields=name')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('name').eql('Bucaramanga')
          done()
        })
    })
  })

  describe('/POST city', () => {
    it('it should NOT POST a city without name', done => {
      const city = {}
      chai
        .request(server)
        .post('/cities')
        .set('Authorization', `Bearer ${token}`)
        .send(city)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a city ', done => {
      const city = {
        name
      }
      chai
        .request(server)
        .post('/cities')
        .set('Authorization', `Bearer ${token}`)
        .send(city)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'name')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a city that already exists', done => {
      const city = {
        name
      }
      chai
        .request(server)
        .post('/cities')
        .set('Authorization', `Bearer ${token}`)
        .send(city)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/GET/:id city', () => {
    it('it should GET a city by the given id', done => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/cities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id city', () => {
    it('it should UPDATE a city given the id', done => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/cities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('name').eql(newName)
          done()
        })
    })
    it('it should NOT UPDATE a city that already exists', done => {
      const city = {
        name: repeatedName
      }
      chai
        .request(server)
        .post('/cities')
        .set('Authorization', `Bearer ${token}`)
        .send(city)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'name')
          res.body.should.have.property('name').eql(repeatedName)
          createdID.push(res.body._id)
          const anotherCity = {
            name: newName
          }
          chai
            .request(server)
            .patch(`/cities/${createdID.slice(-1).pop()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(anotherCity)
            .end((error, result) => {
              result.should.have.status(422)
              result.body.should.be.a('object')
              result.body.should.have.property('errors')
              done()
            })
        })
    })
  })

  describe('/DELETE/:id city', () => {
    it('it should DELETE a city given the id', done => {
      const city = {
        name
      }
      chai
        .request(server)
        .post('/cities')
        .set('Authorization', `Bearer ${token}`)
        .send(city)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'name')
          res.body.should.have.property('name').eql(name)
          chai
            .request(server)
            .delete(`/cities/${res.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach(id => {
      City.findByIdAndRemove(id, err => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
