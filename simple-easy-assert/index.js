


// describe('earth', function(){
//   beforeEach(function(){
//     console.log('see.. this function is run EACH time, before each describe()')
//   })
//   describe('singapre', function(){
//     it('birds should fly', function(){ /** ... */ })
//   })
//   describe('malaysia', function(){
//     it('birds should soar', function(){ /** ... */ })
//   })
// })
function add(aNumber, bNumber) {
  return aNumber + bNumber;
}


const 希望 = require("ctressa")

test("两个字符串相等吗", () => {
  希望("test").和("tests").严格相等
})

test("希望我的add函数能正常吧", () => {
  希望(add(1,2)).和(3).严格相等
})



