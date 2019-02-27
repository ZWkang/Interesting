## border-shadow-magic-with-styled-components
> Have you heard of about one-div-draw ?

### use border-shadow

我们都知道border-shadow可以添加多个阴影。
而且颜色大小均可控。
如果你听说过one-div这个有趣得东西得花，那么你应该会对这个感兴趣。

当我们得border-shadow一个阴影块代表一个px 甚至更小得时候。
那么此时我们可以做出有趣得像素画，甚至是矢量图


此组件得作用正是如此。
```
import BorderMagic from './components/someTrack/borderMagic'
```



  borderStyle: PropTypes.string,
  normalSize: PropTypes.number,
  matrixArray: PropTypes.arrayOf(
    PropTypes.array
  )


```
props

imageUrl (赋予能力  您可以使用网络资源图片进行获取转换成我们的one-div)
normalSize 默认得一个像素块大小
matrixArray (手动输入矩阵数组)
borderStyle (最外边框得border样式)
isDuble (决定是否水平复制翻转)(因为大量的像素图是水平翻转完成)
isDubleTwo={false} (翻转的点)(121)(1221)
```

---
notic
图片如果是较大，意味着render的阴影快可能存在较多。
这个时候如果用console 调试，对console控制台的负担消耗内存很大。

优化点:
块与块之间可以累加行成一个较大的块 从而进行优化块数量

---

MIT

---
@author

ZWkang