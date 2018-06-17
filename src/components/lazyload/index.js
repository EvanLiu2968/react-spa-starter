/**
 * react-lazyload
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import LazyLoad from './lazyload';

const ImgLazyLoad = LazyLoad;

/* 懒加载图片 */
export default ImgLazyLoad;

/* 懒加载组件 */
// export const LazyLoad;

/* 自定义懒加载组件 */
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const lazyload = (options = {}) => function lazyload(WrappedComponent) {
  return class LazyLoadDecorated extends Component {
  constructor() {
  super();
  this.displayName = `LazyLoad${getDisplayName(WrappedComponent)}`;
  }

  render() {
  return (
  <LazyLoad {...options}>
    <WrappedComponent {...this.props} />
  </LazyLoad>
  );
  }
  };
};
