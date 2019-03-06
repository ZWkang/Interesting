const { parse } = require('@babel/parser')
const babel = require("@babel/core");
const assert = require('assert')

const myVister = {
    FunctionDeclaration: function (path){
        // console.log(path.node.id.name)
        path.node.id.name = 'xxx'
    },
    CallExpression: function (path) {
        // console.log(path.node.callee.name)
        path.node.callee.name = 'xxx'
    }
}
const TEST_STRING = `
function test_name(){}
test_name()
`

const result = babel.transform(TEST_STRING, {
    plugins: [
        { visitor: myVister }
    ]
})
