## code-splitting demo

---

### feature

- 解析依赖
- 抽取公共文件
- 修改对应引用地址

### main

其实能做的很多

code-splitting 只是单纯的对依赖对判断操作

一些例如 side-effect 操作应该如何区分。

tree-sharking 是一种对实际使用做拆分。判断是否有进行使用

而 code split 大多在明确声明 split 区分位置

例如 webpack 中的 Vendor 拆分， 动态引入，入口拆分

这里我们做的 demo 更像是 vendor 的拆分。

而 tree-sharking 更多是针对在对 dead code 做删减。

例如你可能 import util from 'util'

你可能只是利用到了 util 中一个函数功能，但是这种引用迫使你打包的时候将整个 util 打包进你的应用内

babel 在解析的时候会默认将 es_modules 转化为符合 commonJS 规范的代码。

这样以来 es module 一个很重要的特性静态编译就失效了。

那么我们就很难对一个模块做 tree-sharking

```
{
  "presets": [
    ["env", {
      "modules": false
    }]
  ]
}
```

取消 babel 的这种行为

这样以来我们可以在 import { xx } from 'util'

这样来静态解析我们要的函数

还可以指定 webpack 配置项 sideEffect 来明确告知 webpack 我们的代码中没有副作用，可以安心的干起来(影响了当前函数作用域外)

一个比喻 DCE（dead code elemination）

做蛋糕的时候将蛋壳啥的丢进去一起做，做出来了再把蛋壳那些不需要的挑掉

一个比喻 tree-sharking

做蛋糕开始前就将蛋壳那些给一一去掉，只留下蛋糕的原料

![好文章](https://www.jianshu.com/p/199850576e8c)

## author

@zwkang

## MIT
