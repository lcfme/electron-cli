import mock from 'mock-fs'
import { expect } from 'chai'
import fs from 'fs'

import initJson from '../../src/init/json'

describe('init json',()=> {
  before(()=> {
    mock({
      'path/to/fake/dir': {}
    })
  })

  it('should create a json',done => {
    initJson('path/to/fake/dir',{hello:'hi'})
    fs.readFile('path/to/fake/dir/package.json',error => {
      expect(error).to.equal(null)
      done()
    })
  })

  it('should return an error',done => {
    initJson('other/path/to/fake/dir',{hello:'hi'}).catch(err => {})
    fs.readFile('other/path/to/fake/dir',error => {
      expect(error).to.not.equal(null)
      done()
    })
  })

  after(()=>{
    mock.restore()
  })
})
