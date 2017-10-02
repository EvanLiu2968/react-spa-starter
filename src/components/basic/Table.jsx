/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table, Button, Tag } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';

class BasicTable extends React.Component {
    state = {
        tableData:[],
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
        axios.get('/douban/v2/movie/top250',{
            params:{
                start:start,
                count:count
            }
        }).then(res=>{
            console.log(res);
            let data=res.data;
            this.setState({
                tableData:data.subjects,
                pagination:{
                    total:data.total
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
    viewDetail = (arr) => {
        console.log(arr)
    };
    render() {
        const columns = [
            {
                title: '电影名称',
                dataIndex: 'title',                
                key: 'title',
                render: (value,arr,index) => (
                    <a href={arr.alt} target="_blank">{value}</a>
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
                render: (value,arr,index) => {
                    let tags=[];
                    for (let i=0;i<value.length;i++){
                        tags.push(<Tag color="pink">{value[i]}</Tag>);
                    }
                    return (
                        <div>{ tags }</div>
                    )
                }
            },
            {
                title: '导演',
                dataIndex: 'directors',
                key: 'directors',
                render: (value,arr,index) => {
                    let links=[];
                    for (let i=0;i<value.length;i++){
                        links.push(
                            <span className={i===0?'':'ant-divider'}>
                                <a href={value[i].alt} target="_blank">{value[i].name}</a>
                            </span>
                        );
                    }
                    return (
                        // <div>{ links }</div>
                        <div>{ value.map((v,i,a)=>(
                            <span className={i===0?'':'ant-divider'}>
                                <a href={v.alt} target="_blank">{v.name}</a>
                            </span>
                        )) }</div>
                    )
                }
            },
            // {
            //     title: '演员',
            //     dataIndex: 'casts',
            //     key: 'casts',
            //     width:'300px',
            //     render: (value,arr,index) => {
            //         let links=[];
            //         for (let i=0;i<value.length;i++){
            //             links.push(
            //                 <span className={i===0?'':'ant-divider'}>
            //                     <a href={value[i].alt} target="_blank">{value[i].name}</a>
            //                 </span>
            //             );
            //         }
            //         return (
            //             <div>{ links }</div>
            //         )
            //     }
            // },
            {
                title: '评分',
                dataIndex: 'rating',
                key: 'rating',
                render: (value,arr,index) => (
                    <span>{value.average}/{value.max}</span>
                )
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render: (value, arr, index) => {
                    let viewDetail=() => {
                        return this.viewDetail(arr,index);
                    }
                    return (
                        <Button type="primary" icon="ellipsis" shape="circle" onClick={viewDetail} />
                    )
                }
            }
        ];
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="基础组件" second="表格" />
                <Table columns={columns}
                    rowKey={record=>record.id}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    dataSource={this.state.tableData}
                />
            </div>
        )
    }
}
export default BasicTable;