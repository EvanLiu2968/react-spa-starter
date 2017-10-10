/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table, Button, Tag, Card, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import fetch from '@/assets/js/fetch.js';

class BasicTable extends React.Component {
    state = {
        tableData:[],
        currentRow:{},
        detailVisible:false,
        pagination:{
            current:1,
            pageSize:10,
            total:0
        },
        loading:true
    };
    componentWillMount = () => {
        this.search();
    }
    componentDidMount = () => {
        console.log('didMount');
    };
    search = () => {
        this.setState({
            loading:true
        });
        let start=(this.state.pagination.current-1)*this.state.pagination.pageSize;
        console.log(this.state);
        let count=this.state.pagination.pageSize;
        fetch({
            method:'get',
            url:'/douban/v2/movie/top250',
            params:{
                start:start,
                count:count
            }
        }).then(res=>{
            console.log(res);
            this.setState({
                tableData:res.subjects,
                pagination:{
                    total:res.total
                },
                loading:false
            });
        }).catch(err=>{
            this.setState({
                loading:false
            });
        })
    };
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination)
        this.setState({
            pagination:{
                current:pagination.current,
                pageSize:pagination.pageSize
            }
        },()=>{
            this.search();
        });
    };
    viewDetail = (record,index,event) => {
        console.log(record);
        record.largeImage=record.images.large;
        console.log(this.props);
        //console.log(index);
        //console.log(event.target);
        this.setState({
            currentRow:record,
            detailVisible:true
        });
    };
    closeDetailModal = (e) => {
        console.log(e);
        this.setState({
            detailVisible:false
        });
    };
    render() {
        const columns = [
            {
                title: '电影名称',
                dataIndex: 'title',                
                key: 'title',
                render: (value,record,index) => (
                    <a href={record.alt} target="_blank">{value}</a>
                )
            },
            {
                title: '年份',
                dataIndex: 'year',
                key: 'year'
            },
            {
                title: '标签',
                dataIndex: 'genres',
                key: 'genres',
                render: (value,record,index) => {
                    return (
                        <div>{ value.map((v,i,a)=>{
                            <Tag color="pink" key={i}>{v}</Tag>
                        })}</div>
                    )
                }
            },
            {
                title: '导演',
                dataIndex: 'directors', //casts
                key: 'directors',
                render: (value,record,index) => {
                    return (
                        <div>{ value.map((v,i,a)=>(
                            <span className={i===0?'':'ant-divider'} key={i}>
                                <a href={v.alt} target="_blank">{v.name}</a>
                            </span>
                        )) }</div>
                    )
                }
            },
            {
                title: '评分',
                dataIndex: 'rating',
                key: 'rating',
                render: (value,record,index) => (
                    <span>{value.average}/{value.max}</span>
                )
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render: (value, record, index) => {
                    return (
                        <Button title="查看详情" type="primary" icon="ellipsis" shape="circle" onClick={this.viewDetail.bind(this,record,index)} />
                    )
                }
            }
        ];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="基础组件" second="表格" />
                <Card>
                    <Table columns={columns}
                        rowKey={record=>record.id}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        dataSource={this.state.tableData}
                    />
                </Card>
                <Modal title="详情" visible={this.state.detailVisible} 
                    onCancel={this.closeDetailModal} footer={null}>
                    <img src={`${this.state.currentRow.largeImage}`} style={{
                        maxWidth:'100%',
                        display:'block',
                        margin:'0 auto'
                    }} />
                </Modal>
            </div>
        )
    }
}
export default BasicTable;