import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { on, off } from './utils/event';
import { checkOverflowVisible, checkNormalVisible } from './utils/checkVisible';
import { passiveEvent } from './utils/passiveEventSupport';

class ImgLazyLoad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.lazyLoadHandler=this.lazyLoadHandler.bind(this)
  }
  componentDidMount(){
    on(window, 'scroll', this.lazyLoadHandler, passiveEvent);
    this.lazyLoadHandler()
  }
  componentWillUnmount(){
    off(window, 'scroll', this.lazyLoadHandler, passiveEvent);
  }
  lazyLoadHandler(){
    if(checkNormalVisible(this)){
      console.log('component is visible.')
      let img = new Image(); //创建一个Image对象，实现图片的预下载
      img.src = this.props.src;
      if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        this.loadedHandle()
        return; // 直接返回，不用再处理onload事件
      }
      img.onload = ()=> { //图片下载完毕时异步调用callback函数。
        this.loadedHandle()
      };
    }
  }
  loadedHandle(){
    off(window, 'scroll', this.lazyLoadHandler, passiveEvent);
    this.setState({
      loaded:true
    })
  }
  render(){
    return (
      <div className="img-lazyload" style={this.props.style?this.props.style:{}}>
        {this.state.loaded?<img src={this.props.src} />:this.props.placeholder}
      </div>
    )
  }
}

ImgLazyLoad.defaultProps = {
  offset: 0,        //触发加载图片时到视口底部的最小距离
  delay: 0,          //延迟加载时间
  animate: false,   //动画，透明度渐变或loading动画
  overflow: false,  //溢出是否可见
  resize: false,    //窗口resize时是否重新执行逻辑
  scrollContainer: '',//滚动容器，暂只考虑window
  placeholder: <div><i className="shop-logo-long"></i></div>,  //占位节点，可为jsx
};

export default ImgLazyLoad
// export default function Starsx(options){
//   let dft = {
//     placeholder:<i className="shop-logo-long"></i>,
//     url:'/images/logo-180x48.png',
//   }
//   dft = _.merge(dft, options)
//   return ImgLoad(dft)
// }

// export function pure(props){
//   return ImgLoad(props)
// }