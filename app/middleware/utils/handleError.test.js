const { handleError } = require('./handleError')

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValueOnce(res)
  res.json = jest.fn().mockReturnValueOnce(res)
  return res
}

const err = {
  message: 'error',
  code: 123
}

describe('handleError()', () => {
  it('should send the error object with the code and message provided and print the error code, message in development mode', async () => {
    process.env.NODE_ENV = 'development'

    const res = mockResponse()

    console.log = jest.fn()

    await handleError(res, err)

    expect(console.log).toHaveBeenCalledWith({
      code: 123,
      message: 'error'
    })

    expect(res.status).toHaveBeenCalledWith(123)

    expect(res.json).toHaveBeenCalledWith({
      errors: {
        msg: 'error'
      }
    })
  })
})
