/**
 * Created by evanliu2968
 */
import React, { Component } from 'react';
import { message, Card, Modal, Tooltip, Icon, Select, Row, Col, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import Message from '../message';

class Modals extends Component {
    state = {
      visible: false
    };
    messagebox = (type) => {
      if(type === 'alert'){
          Message.alert('你不要再点击了！',{
            type:'error'
          })
      }else if(type === 'confirm'){
          Message.confirm('你确定要点击确定按钮吗',{
            type:'info'
          }).then(()=>{
            message.success('已点击确定');
          })
      }else if(type === 'msg'){
          Message.msg('要duck不要bug',{
            type:'warning',
            showMask:false
          })
      }else{
        Message({
          message:(
              <BreadcrumbCustom first="基础组件" second="表单" />
            ),
          type:'success'
        })
      }
    };
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    showMessageModal = () => {
      Message.confirm('加个好友吧！',{
        type:'info'
      }).then(()=>{
        Modal.success({
          title: '提示',
          content: '你们已经是好友了，打个招呼吧',
        })
      })
    };
    showNotice = (type) => {
      Message.notice('这是一个很长很长'+type+'状态',type)
    };
    showMessage = (type) => {
      message[type]('这是一个'+type+'状态')
    };
    render() {
        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="基础组件" second="消息弹框" />
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="注册表单" bordered={false}>
                          <div>
                            <h1>messageBox</h1>
                            <Button type="primary" onClick={this.messagebox.bind(this,'alert')} size="large">alert</Button>
                            <Button type="primary" onClick={this.messagebox.bind(this,'confirm')} size="large">confirm</Button>
                            <Button type="primary" onClick={this.messagebox.bind(this,'msg')} size="large">msg</Button>
                            <Button type="primary" onClick={this.messagebox.bind(this,'jsx')} size="large">jsx</Button>
                          </div>
                          <div>
                            <h1>antd Modal</h1>
                            <Button type="primary" onClick={this.showModal}>模态框</Button>
                            <Modal title="模态框里再套一个模态框"
                              visible={this.state.visible}
                              onOk={this.showMessageModal}
                              onCancel={()=>{this.setState({visible: false})}}
                              okText="是的"
                              cancelText="没有"
                            >
                              <p>你看过盗梦空间吗？</p>
                            </Modal>
                          </div>
                          <div>
                            <h1>notice</h1>
                            <Button type="primary" onClick={this.showNotice.bind(this,'success')} size="large">success</Button>
                            <Button type="primary" onClick={this.showNotice.bind(this,'info')} size="large">info</Button>
                            <Button type="primary" onClick={this.showNotice.bind(this,'warning')} size="large">warning</Button>
                            <Button type="primary" onClick={this.showNotice.bind(this,'error')} size="large">error</Button>
                          </div>
                          <div>
                            <h1>antd message</h1>
                            <Button type="primary" onClick={this.showMessage.bind(this,'success')} size="large">success</Button>
                            <Button type="primary" onClick={this.showMessage.bind(this,'info')} size="large">info</Button>
                            <Button type="primary" onClick={this.showMessage.bind(this,'warning')} size="large">warning</Button>
                            <Button type="primary" onClick={this.showMessage.bind(this,'error')} size="large">error</Button>
                          </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

export default Modals;