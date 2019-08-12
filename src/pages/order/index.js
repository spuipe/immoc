import React from "react";
import { Card, Button, Table, Form, Select, Modal, message,DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import BaseForm from "../../components/BaseForm"

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{

    constructor (props){
        super(props);

        this.state = {
          orderInfo: {},
          orderConfirmVisble: false
        };
    }

    params = {
        page: 1
    }

    formList = [
      {
        type: "SELECT",
        label: "城市",
        field:"city",
        placeholder: "全部",
        list: [{id: 0,name: "全部"},{id: 1,name: "北京市"},{id: 2,name: "天津市"},{id: 3,name: "广州市"}],
        width: 90,
        initialValue: 1
      },
      {
        type: "时间查询"
      },
      {
        type: "SELECT",
        label: "订单状态",
        field: "op_status",
        placeholder: "全部",
        list: [{id: 0,name: "全部"},{id: 1,name: "进行中"},{id: 2,name: "结束行程"}],
        width: 90,
        initialValue: 1
      },
    ]

    componentWillMount(){
        this.requestList();
    }

    // 请求数据
    requestList = ()=>{
        let _this = this;
        axios.requrestList(this,"/order/list",this.params,true)
    }

    openOrderDetail = ()=>{
      let item = this.state.selectedItem;
      if(!item){
        Modal.info({ title: "信息",content: "请先选择一条订单" })
        return;
      }
      window.open(`/#/common/order/detial?orderId=${item.id}`,"_blank");
    }

    handleConfirm = ()=>{
      let item = this.state.selectedItem;
      if(!item){
        Modal.info({ title: "信息",content: "请选择一条订单进行结束" })
        return;
      }
      axios.ajax({
        url: "/order/ebike_info",
        data: { params: { orderId: item.id } }
      }).then((res)=>{
        if(res.code == 0){
          this.setState({ orderInfo: res.result,orderConfirmVisble: true })
        }
      })
    }

    handleFinishOrder = ()=>{  // 结束订单
      let item = this.state.selectedItem;
      axios.ajax({ url: "/order/finish_order",data: {params: {orderId: item.id} } }).then((res)=>{
        if(res.code == 0){
          message.success("订单结束成功");
          this.setState({ orderConfirmVisble: false })
          this.requestList();
        }
      })
    }

    onRowClick = (record,index)=>{  // 选中行，保存当前行的属性
      let selectKey = [index];
      this.setState({
        selectedRowKeys: selectKey,
        selectedItem: record
      });
    }

    // 接收BaseForm的值
    filterSelect = (params)=>{
      this.params = params;
      this.requestList();
    }

    render (){
        const columns = [
            { title: "订单编号",dataIndex: "order_sn" },
            { title: "车辆编号",dataIndex: "bike_sn" },
            { title: "用户名",dataIndex: "user_name" },
            { title: "手机号",dataIndex: "mobile" },
            { title: "里程",dataIndex: "distance" },
            { title: "行驶时长",dataIndex: "total_time" },
            { title: "状态",dataIndex: "status" },
            { title: "开始时间",dataIndex: "start_time" },
            { title: "结束时间",dataIndex: "end_time" },
            { title: "订单金额",dataIndex: "total_fee" },
        ];

        const formItemLayout = {
          labelCol:{span:5},
          wrapperCol:{span:19}
        };
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
          type: 'radio',
          selectedRowKeys
        };

        return (
            <div>
              <Card><BaseForm formList={this.formList} handleSelect={this.filterSelect} /></Card>
              <Card style={{marginTop: 10}}>
                <Button type="primary" style={{marginRight: 10}} onClick={this.openOrderDetail}>订单详情</Button>
                <Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
              </Card>

              <div>
                <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.list} pagination={this.state.pagination} bordered onRow={(record,index)=>{
                  return { onClick: ()=>{
                    this.onRowClick(record,index);
                  } }
                }}/>
              </div>

              <Modal title="结束订单" visible={this.state.orderConfirmVisble} onOk={this.handleFinishOrder} width={600}  onCancel={()=>{ this.setState({ orderConfirmVisble:false }) }} >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}


