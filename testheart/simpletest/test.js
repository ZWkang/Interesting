const add = require('./index.js')
const assert = require('assert')

try {
    assert((add(1,2)) === 3 , "代码预期为1+2=3")

    assert((add(1,2)) === 6 , "代码预期应该为1+2=3，错误输出")
}catch(e){
    console.log(e.message)
}