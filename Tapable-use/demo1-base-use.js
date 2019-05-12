// const {
// 	SyncHook,
// 	SyncBailHook,
// 	SyncWaterfallHook,
// 	SyncLoopHook,
// 	AsyncParallelHook,
// 	AsyncParallelBailHook,
// 	AsyncSeriesHook,
// 	AsyncSeriesBailHook,
// 	AsyncSeriesWaterfallHook
//  } = require("tapable");

// const hook = new SyncHook(['hookNameFirst', 'hookNameSecond'])


// hook.tap('hookLock', (firstname, secondname ) => {
//     console.log(firstname, secondname)
// })

// hook.call('haha', 'xix')
// // console.log(hook)

// async function async1() {
//     console.log("async1 start");
//     await  async2();
//     console.log("async1 end");
// }

// async  function async2() {
//     console.log( 'async2');
// }

// console.log("script start");

// setTimeout(function () {
//     console.log("settimeout");
// },0);

// async1();

// new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function () {
//     console.log("promise2");
// });
// console.log('script end'); 




Promise.resolve(1).then(v => v).then(v => console.log(v))


process.nextTick(() => {
    console.log('xixi')
})