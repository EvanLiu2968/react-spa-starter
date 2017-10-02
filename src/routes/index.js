/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Page from '../components/Page';
import Login from '../components/auth/Login';
import RouterEnter from '../components/auth/RouterEnter';
import Denied from '../components/auth/Denied';
import NotFound from '../components/auth/NotFound';


const Dashboard = (location, callback) => { // 异步加载
    require.ensure([], require => {
        callback(null, require('../components/dashboard/Dashboard').default);  //export default则需要加.default
    }, 'Dashboard'); //对应打包js的[name],可省略
};
const BasicForm = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/basic/Form').default);
    }, 'BasicForm');
};
const BasicTable = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/basic/Table').default);
    }, 'BasicTable');
};
const AuthBasic = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../components/auth/Basic').default);
    }, 'AuthBasic');
};


export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { store } = this.props;
        const { auth } = store.getState().httpData;
        if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
        return component;
    };
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/app/dashboard/index" />
                    <Route path={'app'} component={App}>
                        <Route path={'basic'}>
                            <Route path={'basicForm'} getComponent={BasicForm} />
                            <Route path={'basicTable'} getComponent={BasicTable} />
                        </Route>
                        <Route path={'dashboard/index'} getComponent={Dashboard} />
                        <Route path="auth">
                            <Route path="basic" getComponent={AuthBasic} />
                            <Route path="routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />
                        </Route>
                    </Route>
                    <Route path={'login'} components={Login} />
                    <Route path={'403'} component={Denied} />
                    <Route path={'404'} component={NotFound} />
                </Route>
            </Router>
        )
    }
}