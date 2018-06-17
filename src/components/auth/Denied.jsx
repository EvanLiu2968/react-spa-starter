/**
 * Created by hao.cheng on 2017/5/7.
 */
import React from 'react';
import img from '@/assets/img/404.png';


class NotFound extends React.Component {
  state = {
    animated: ''
  };
  enter = () => {
    this.setState({animated: 'hinge'})
  };
  render() {
    return (
      <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
        <img src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
        <p>您没有相关权限，请联系管理员！</p>
      </div>
    )
  }
}

export default NotFound;