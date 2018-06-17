/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ReactEcharts from 'echarts-for-react';

const option = {
  title: {
    text: ''
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  label: {
    normal: {
      show: true,
      textStyle: {
        fontSize: 11
      },
    }
  },
  legend: {
    x: "center",
    show: false,
    data: ["UI", "dep", 'dev-dep']
  },
  series: [

    {
      type: 'graph',
      layout: 'force',
      symbolSize: 45,
      focusNodeAdjacency: true,
      roam: true,
      categories: [{
        name: 'UI',
        itemStyle: {
          normal: {
            color: "#f04134",
          }
        }
      }, {
        name: 'dep',
        itemStyle: {
          normal: {
            color: "#4582FF",
          }
        }
      }, {
        name: 'dev-dep',
        itemStyle: {
          normal: {
            color: "#3582F",
          }
        }
      }],
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 12
          },
        }
      },
      force: {
        repulsion: 900
      },
      edgeSymbolSize: [4, 50],
      edgeLabel: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 10
          },
          formatter: "{c}"
        }
      },
      data: [{
        name: 'react',
        draggable: true,
      }, {
        name: 'react-dom',
        category: 1,
        draggable: true,
      }, {
        name: 'react-router',
        category: 1,
        draggable: true,
      }, {
        name: 'redux',
        category: 1,
        draggable: true,
      }, {
        name: 'redux-thunk',
        category: 1,
        draggable: true,
      }, {
        name: 'react-redux',
        category: 1,
        draggable: true,
      }, {
        name: 'antd',
        category: 1,
        draggable: true,
      }, {
        name: 'less',
        category: 1,
        draggable: true,
      }, {
        name: 'eslint',
        category: 1,
        draggable: true,
      }, {
        name: 'webpack',
        category: 1,
        draggable: true,
      }, {
        name: 'babel',
        category: 1,
        draggable: true,
      }, {
        name: 'jsx',
        category: 1,
        draggable: true,
      }, {
        name: 'loader',
        category: 1,
        draggable: true,
      }],
      links: [{
        source: 0,
        target: 1,
        category: 0,
        value: 'dep'
      }, {
        source: 0,
        target: 2,
        value: 'dep'
      }, {
        source: 0,
        target: 3,
        value: 'dep'
      }, {
        source: 0,
        target: 4,
        value: 'dep'
      }, {
        source: 0,
        target: 5,
        value: 'dep'
      }, {
        source: 0,
        target: 6,
        value: 'UI'
      }, {
        source: 0,
        target: 7,
        value: 'dev-dep'
      }, {
        source: 0,
        target: 7,
        value: 'dev-dep'
      }, {
        source: 0,
        target: 8,
        value: 'dev-dep'
      }, {
        source: 0,
        target: 9,
        value: 'dev-dep'
      }, {
        source: 0,
        target: 10,
        value: 'dep'
      }, {
        source: 0,
        target: 11,
        value: 'dep'
      }, {
        source: 3,
        target: 4,
        value: 'dep'
      }, {
      }, {
        source: 3,
        target: 5,
        value: 'dep'
      }, {
      }, {
        source: 7,
        target: 8,
        value: 'dep'
      }, {
      }, {
        source: 7,
        target: 9,
        value: 'dep'
      }, {
        source: 7,
        target: 12,
        value: 'dep'
      }, {
        source: 11,
        target: 9,
        value: 'dep'
      }, {
        source: 11,
        target: 10,
        value: 'dep'
      }, {
        source: 11,
        target: 12,
        value: 'dep'
      }],
      lineStyle: {
        normal: {
          opacity: 0.8,
          width: 1,
          curveness: 0
        }
      }
    }
  ]
};
class Dashboard extends React.Component {
  render() {
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCustom />
        <div className="gutter-box">
          <Card title="React APP 关系图" bordered={false}>
            <ReactEcharts
              option={option}
              style={{height: '400px', width: '100%'}}
              className={'react_for_echarts'} 
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default Dashboard;