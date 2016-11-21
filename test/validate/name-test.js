import validateName from '../../src/validate/name'
import { expect } from 'chai'

describe('name validation',()=> {
  it('should return no errors',()=> {
    const result = validateName('roderik')

    expect(result).to.equal(true)
  })
  it('should return an error',()=> {
    const result = validateName('R}oderik')

    expect(result).to.equal('name can no longer contain capital letters')
  })
})
