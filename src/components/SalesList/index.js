import React from 'react';
import {DatePicker,Select,Input,Button,Icon,Table,Modal,notification } from 'antd';
import {Router, Route, IndexRoute, hashHistory,Link} from 'react-router';
import './index.less';
import SalesModal from '../Modal'

const { RangePicker } = DatePicker;
const Option = Select.Option;

//模态框组件
const confirm  = Modal.confirm;

function showConfirm() {
  confirm({
    title: '确定删除?',
    content: '点击确定按钮进行删除，点击取消按钮取消本次行为',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(openNotification, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

const openNotification = () => {
  notification.open({
    message: '删除提示',
    description: '该条用户信息已成功删除！',
  });
};


const columns = [
  {
    title: '客户姓名',
    dataIndex: 'username',
    key: 'username',
    render: text => <a href="javascript:;">{text}</a>,
  }, 
  {
    title: '车辆牌照',
    dataIndex: 'carnum',
    key: 'carnum',
  }, 
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  }, 
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
          <SalesModal />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* <a onClick={showConfirm}>删除</a> */}
          <Button type='danger' onClick={showConfirm}>删除</Button>
      </span>),
  }
];


const data = [
  {
    key: '1',
    username: '大海',
    carnum: '皖A12345',
    phone: '15655029660',
  }, 
  {
    key: '2',
    username: '小溪',
    carnum: '皖A12346',
    phone: '15655029661',
  }, 
  {
    key: '3',
    username: '张小美美',
    carnum: '皖A12347',
    phone: '15655029662',
  }
];


class SalesList extends React.PureComponent {
  state = {
    StoreID:'c530c3f0-fd41-43e6-b1ee-bbbdeba45b13',
    PageNum:'1',
    PageSize:'11',
    STime:'2018-05-01 00:00:00',
    ETime:'2018-05-20 00:00:00',
    SettlementStatus:'',
    BillMark:'',
    Keyword:'',
    IsAllData:'0'
  }
  render() {
    return (
      <div>
        <div className='oh'>
          <div className='fl date'>
            结算时间：
            <RangePicker/>
          </div>
          <div className='fl item'>
            结算状态：
            <Select>
                <Option value="全部">全部</Option>
                <Option value="已结算">已结算</Option>
                <Option value="挂账">挂账</Option>
                <Option value="挂账已结清">挂账已结清</Option>
                <Option value="已撤单">已撤单</Option>
            </Select>
          </div>
          <div className='fl item'>
            保养单：
              <Select>
                  <Option value="全部">全部</Option>
                  <Option value="是">是</Option>
                  <Option value="否">否</Option>
              </Select>
          </div>
          <div className='fl keyword'>
            关键字：
            <Input placeholder="车辆牌照/姓名/手机号码/备注/项目/接待员" />
          </div>
          <div className='btn-group fl'>
             <Button type="primary" icon="search">查询</Button>
             <Button type="primary">
                {/* <Icon type="left" />刷新 */}
                {/* <Icon type="sync" style={{ fontSize: 16, color: '#08c' }} /> */}
                <Icon type="loading" />刷新
             </Button>
             <Button type="primary" icon="download">导出</Button>
          </div>
        </div>
        <div className='oh'>
            <div className='total'>
                <div className='total-item'>
                    实收：￥<span>0.00</span>
                </div>
                <div className='total-item'>
                    总产量：<span>0</span>
                </div>
                <div className='total-item'>
                    保养单：<span>0</span>
                </div>
                <div className='total-item'>
                    客单价：￥<span>0.00</span>
                </div>
            </div>
        </div>
        <div className='sales-table'>
           {/* 表格分页没做 */}
          <Table columns={columns} dataSource={data}/>
        </div>

      </div>

    )
  }

}

export default SalesList;
