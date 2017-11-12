/**
 * Created by evanliu2968
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{overflowY: 'auto'}}
            >
                <div className="logo" />
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                >
                    <Menu.Item key="/app/dashboard/index">
                        <Link to={'/app/dashboard/index'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
                    </Menu.Item>
                    <SubMenu
                        key="/app/basic"
                        title={<span><Icon type="copy" /><span className="nav-text">基础组件</span></span>}
                    >
                        <Menu.Item key="/app/basic/basicModal"><Link to={'/app/basic/basicModal'}>消息弹框</Link></Menu.Item>
                        <Menu.Item key="/app/basic/basicForm"><Link to={'/app/basic/basicForm'}>表单</Link></Menu.Item>
                        <Menu.Item key="/app/basic/basicTable"><Link to={'/app/basic/basicTable'}>表格</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="/app/auth"
                        title={<span><Icon type="safety" /><span className="nav-text">路由及权限</span></span>}
                    >
                        <Menu.Item key="/app/auth/basic"><Link to={'/app/auth/basic'}>基础演示</Link></Menu.Item>
                        <Menu.Item key="/app/auth/routerEnter"><Link to={'/app/auth/routerEnter'}>路由拦截</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;