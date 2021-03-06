/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Button, Tag, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LazyLoad from '../lazyload';
import fetch from '@/assets/js/fetch.js';

class BasicList extends React.Component {
  state = {
  listData:[],
  loading:true
  };
  componentWillMount = () => {
  this.setState({
    listData:[
    {
      img:'https://evanliu2968.github.io/static/images/photo/flower_01.jpg',
      desc:'生如茶花',
      title:'深圳'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/flower_02.jpg',
      desc:'故事的小黄花，从出生那年就飘着',
      title:'菊'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/flower_03.jpg',
      desc:'一只蜜蜂，两株茶树',
      title:'家门的茶花'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/huangshan_01.jpg',
      desc:'山与海交汇的地方',
      title:'西海大峡谷'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/huangshan_02.jpg',
      desc:'我是萌萌的芬里尔',
      title:'一只家在黄山的松鼠'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/huangshan_03.jpg',
      desc:'天青色等烟雨，而你在等我',
      title:'宏村'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/m_01.jpg',
      desc:'天空是蒙蒙的雾',
      title:'龙华'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/m_02.jpg',
      desc:'真实的幻境',
      title:'池塘倒影'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/m_03.jpg',
      desc:'看不见，路的方向',
      title:'天路'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/t_01.jpg',
      desc:'深巷中的勒杜鹃',
      title:'春沐巷7号'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/t_02.jpg',
      desc:'村子外，池塘边',
      title:'版画村'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/t_03.jpg',
      desc:'菩提本无树，明镜亦非台',
      title:'菩提树'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/w_01.jpg',
      desc:'依山傍水',
      title:'茶溪谷'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/w_02.jpg',
      desc:'你问我要去向何方，我指着大海的方向',
      title:'西冲'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/w_03.jpg',
      desc:'越过山丘',
      title:'杨梅坑'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/x_01.jpg',
      desc:'一半鲜花，一半顽石',
      title:'生活'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/x_02.jpg',
      desc:'大路小路任我行',
      title:'华侨城'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/x_03.jpg',
      desc:'沙滩与椰树',
      title:'鼓浪屿'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/xiangda_01.jpg',
      desc:'太阳从东方升起',
      title:'金翰林'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/xiangda_02.jpg',
      desc:'上课……下课',
      title:'兴湘草坪'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/xiangda_03.jpg',
      desc:'那年，毕业了',
      title:'三拱门'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/b_01.jpg',
      desc:'狗尾草与城堡',
      title:'童话'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/b_02.jpg',
      desc:'午时犹未识金乌',
      title:'迷雾'
    },
    {
      img:'https://evanliu2968.github.io/static/images/photo/b_03.jpg',
      desc:'Dark Paradise',
      title:'后山树林'
    }
    ]
  })
  }
  componentDidMount = () => {
  console.log('didMount');
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
    <BreadcrumbCustom first="基础组件" second="列表" />
    <Card>
      <ul>
      {this.state.listData.map((item,i)=>{
        return (
        <li key={i}>
          <LazyLoad height={200}>
          <img src={item.img} />
          </LazyLoad>
          {/* <LazyLoad src={item.img} /> */}
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </li>
        )
      })}
      </ul>
    </Card>
    </div>
  )
  }
}
export default BasicList;