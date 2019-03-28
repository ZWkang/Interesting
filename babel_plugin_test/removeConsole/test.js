const removeConsole = require('./index')
const babel = require('@babel/core')
const {expect} = require('chai')
const shouldRemoveDemo = Object.keys(console).reduce((a, b) => {
    return a + `\n console.${b}();`
}, '')

const babelStateString = `
function a () {
	console.log('hahs')
}
`

let consoleReg = /console/g

describe('should removeConsole be work', () => {
    it('it should remove console', () => {
        const res = babel.transform(shouldRemoveDemo, {
            plugins: [removeConsole]
        }).code
        const isResolve = consoleReg.test(res)
        expect(isResolve).to.be.false;
    })
    it('blockstatement should be remove both', () => {
        const res = babel.transform(babelStateString, {
            plugins: [removeConsole]
        }).code
        const isResolve = consoleReg.test(res)
        expect(isResolve).to.be.false
    })
})