'use strict'

const expect = require('chai').expect
const dummy = require('../stockbot-2000')

describe('Dummy unit tests', () => {

	describe('Dummy unit test', () => {

		it('Should be true', (done) => {
			let result = dummy()
			expect(result).to.be.true
			done()
		})

	})

})
