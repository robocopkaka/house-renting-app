import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

chai.use(chaiHttp)

describe('test entry file', () => {
  it('should test that app route works', async () => {
    const res = await chai.request(app).get('/')
    expect(res).to.have.status(200)
    expect(res.text).to.have.eq('app works')
  })

  it('should test non-existing route ', async () => {
    const res = await chai.request(app).get('/houses')
    expect(res).to.have.status(200)
    expect(res.text).to.have.eq('Nothing found')
  })
})
