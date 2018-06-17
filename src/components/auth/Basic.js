/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/auth/AuthWidget';
import beauty from '@/assets/img/jump.jpg';

class Basic extends Component {
  render() {
    return (
      <div>
        <BreadcrumbCustom first="权限管理" second="基础演示" />
        <AuthWidget
          children={auth => (
            <Row>
              <Col span={24}>
                <Card bordered={false} bodyStyle={{minHeight: 500}}>
                  {!auth.uid && <h2 style={{height: 500}} className="center">目前您还没有登录，权限不足</h2>}
                  {
                    auth.permissions && auth.permissions.includes('auth/authPage/visit') &&
                    <div style={{textAlign: 'center'}}>
                      <img src={beauty} alt="" style={{height: 400}} />
                      {(auth.permissions.includes('auth/authPage/edit') &&
                      <div>
                        <p className="text-center">尊贵的VIP会员，新世界·信仰之跃，请您欣赏</p>
                      </div>) ||
                      <div>
                        <p>管理员登录，不一样的世界</p>
                      </div>
                      }
                    </div>
                  }
                </Card>
              </Col>
            </Row>
          )}
        />
      </div>

    )
  }
}

export default Basic;