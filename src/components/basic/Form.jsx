/**
 * Created by evanliu2968
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import Message from '../message';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'guangdong',
    label: '广东',
    children: [{
        value: 'guangzhou',
        label: '广州',
        children: [{
            value: 'tianhe',
            label: '天河',
        }],
    }],
}, {
    value: 'hunan',
    label: '湖南',
    children: [{
        value: 'hengyang',
        label: '衡阳',
        children: [{
            value: 'hengshan',
            label: '衡山',
        }],
    }],
}];

class BasicForms extends Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
                alert('已点击确定')
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{width: '60px'}}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="基础组件" second="表单" />
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="注册表单" bordered={false}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="邮箱"
                                    hasFeedback
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: '请输入合理的邮箱地址!',
                                        }, {
                                            required: true, message: '请输入邮箱地址!',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: '请输入密码!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请确认你的密码!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input type="password" onBlur={this.handleConfirmBlur} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>
                                            昵称&nbsp;
                                            <Tooltip title="别人怎么称呼你?">
                                            <Icon type="question-circle-o" />
                                          </Tooltip>
                                        </span>
                                    )}
                                    hasFeedback
                                >
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="常住地址"
                                >
                                    {getFieldDecorator('residence', {
                                        initialValue: ['guangdong', 'guangzhou', 'tianhe'],
                                        rules: [{ type: 'array', required: true, message: '请选择你的常住地址!' }],
                                    })(
                                        <Cascader options={residences} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="电话号码"
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入你的电话号码!' }],
                                    })(
                                        <Input addonBefore={prefixSelector} />

                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="验证码"
                                    extra="我们必须确认你不是机器人."
                                >
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{ required: true, message: '请输入你获取的验证码!' }],
                                            })(
                                                <Input size="large" />
                                            )}
                                        </Col>
                                        <Col span={12}>
                                            <Button size="large" >获取验证码</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox>我已经阅读过 <a href="">协议</a></Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" onClick={this.messagebox.bind(this,'alert')} size="large">alert</Button>
                                    <Button type="primary" onClick={this.messagebox.bind(this,'confirm')} size="large">confirm</Button>
                                    <Button type="primary" onClick={this.messagebox.bind(this,'msg')} size="large">msgbox</Button>
                                    <Button type="primary" onClick={this.messagebox.bind(this,'jsx')} size="large">jsx</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

const BasicForm = Form.create()(BasicForms);

export default BasicForm;