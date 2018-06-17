# react-lazyload

按需懒加载图片或组件等


## 用法

```javascript
import ImgLazyLoad from './lazyload';
import { LazyLoad } from './lazyload';
import MyComponent from './MyComponent';
/* 懒加载图片 */
const Img=(
  <div className="list">
  <ImgLazyLoad height={200} offset={100}>
    <img src="tiger.jpg" />
  </ImgLazyLoad>
  </div>
)
/* 懒加载组件、jsx */
const LazyLoad=(
  <div className="list">
  <LazyLoad height={200} once>
    <MyComponent />
  </LazyLoad>
  </div>
)
```


## props

### height

Type: Number/String Default: undefined

组件容器样式高度

### once

Type: Bool Default: false

仅加载一次，加载完无后续处理则使用该属性

### offset

Type: Number/Array(Number) Default: 0

视口距组件的距离，`200`指组件视口下方200px时执行加载

数组 `[200, 200]`可设置top offset &bottom offset,用于处理组件在视口上方的情况

### scroll

Type: Bool Default: true

监听scroll事件

### resize

Type: Bool Default: false

监听resize事件

### overflow

Type: Bool Default: false

组件位于overflow的容器内则设置true(即非window滚动事件)


### placeholder

Type: Any Default: undefined

懒加载未完成时的占位元素

### unmountIfInvisible

Type: Bool Default: false

懒加载content unmount时是否显示


### debounce/throttle

Type: Bool / Number Default: undefined

Number为delay的毫秒数

