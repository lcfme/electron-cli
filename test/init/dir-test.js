import mock from 'mock-fs'
import { expect } from 'chai'
import fs from 'fs'

import createDir from '../../src/init/dir'

describe('init json',()=> {
  before(()=> {
    mock({
      '/node': mock.directory({
        mode: 0,
        items: {}
      })
    })
  })

  it('should create a json',done => {
    createDir('/path')
    fs.access('/path',error => {
      expect(error).to.equal(null)
      done()
    })
  })

  it('should return an error',done => {
    createDir('/node/hi').catch(err => {
      done()
    })

  })

  after(()=>{
    mock.restore()
  })
})
