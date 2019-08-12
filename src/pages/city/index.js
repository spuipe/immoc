import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    constructor (props){
        super(props);

        this.state = {
            list: [],
            isShowOpenCity: false
        }
    }

    params = {
        page:1
    }

    componentWillMount (){
        this.requestList();
    }

    requestList = ()=>{  // 请求接口数据
        let _this = this;
       axios.ajax({ url: "/open_city",data: {params: {page: this.params.page} } }).then((res)=>{
          this.setState({ list: res.result.itemList.map((item,index)=>{ 
              item.key = index; 
              return item; 
            }),pagination: Utils.pagination(res,(current)=>{
                _this.params.page = current;
            }) 
          })
       })
    }

    handleOpenCity = ()=>{
       this.setState({ isShowOpenCity: true })
    }

    handlerSubmit = ()=>{
       let cityInfo = this.cityForm.props.form.getFieldsValue();
       axios.ajax({ url: "city/open",data: {params: cityInfo} }).then((res)=>{
           if(res.code == "0"){
               message.success(res.result);
               this.setState({ isShowOpenCity: false });
               this.requestList();
           }
       })
    }

    render (){
        const columns = [
            { title: "城市ID",dataIndex: "id" },
            { title: "城市名称",dataIndex: "name" },
            { title: "用车模式",dataIndex: "mode",render(mode){
                return mode == 1 ? "指定停车点" : "禁停区";
            } },
            { title: "营运模式",dataIndex: "op_mode",render(opMode){
                return opMode == 1 ? "自营" : "加盟";
            } },
            { title: "授权加盟商",dataIndex: "franchisee_name" },
            { title: "城市管理员",dataIndex: "city_admins",render(arr){
                return arr.map((item)=>{ return item.user_name }).join(",");
            } },
            { title: "城市开通时间",dataIndex: "open_time" },
            { title: "操作时间",dataIndex: "update_time",render(updateTime){
                return Utils.formateDate(updateTime);
            } },
            { title: "操作人",dataIndex: "sys_user_name" },
        ];
        return (
            <div>
              <Card><FilterForm /></Card>
              <Card style={{marginTop: 10}}><Button type="primary" onClick={this.handleOpenCity}>开通城市</Button></Card>
              <div className="content-wrap">
                <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} bordered></Table>
              </div>

              <Modal title="开通城市" visible={this.state.isShowOpenCity} onCancel={()=>{this.setState({isShowOpenCity: false})}}  onOk={this.handlerSubmit}>
                <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
              </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {

    render (){
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
              <Form layout="inline">
                <FormItem label="城市">
                  { getFieldDecorator("city_id")(
                      <Select style={{width:100}} placeholder全部>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                      </Select>
                  ) }
                </FormItem>
                <FormItem label="用车模式">
                  { getFieldDecorator("mode")(
                      <Select style={{width: 120}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                      </Select>
                  ) }
                </FormItem>
                <FormItem label="营运模式">
                  { getFieldDecorator("op_mode")(
                      <Select style={{width: 80}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                      </Select>
                  ) }
                </FormItem>
                <FormItem label="加盟商授权状态">
                  { getFieldDecorator("auth_status")(
                      <Select style={{width: 100}} placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                      </Select>
                  ) }
                </FormItem>
                <FormItem>
                  <Button type="primary" style={{margin: "0 20px"}}>查询</Button>
                  <Button>重置</Button>
                </FormItem>
              </Form>
            </div>
        );
    }
}
FilterForm = Form.create({})(FilterForm);


class OpenCityForm extends React.Component {
    render (){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };
        const { getFieldDecorator }  =this.props.form;

        return (
            <div>
              <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                  { getFieldDecorator("cityId",{
                      initialValue: "1"
                  })(
                    <Select style={{width: 200}}>
                      <Option value="1">北京市</Option>
                      <Option value="2">广州市</Option>
                      <Option value="3">天津市</Option>
                      <Option value="4">深圳市</Option>
                      <Option value="5">杭州市</Option>
                    </Select>
                  ) }
                  
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                  { getFieldDecorator("opMode",{
                    initialValue: "1"
                  })(
                    <Select style={{width: 200}}>
                      <Option value="1">自营</Option>
                      <Option value="2">加盟</Option>
                    </Select>
                  ) }
                  
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                  { getFieldDecorator("useMode",{
                    initialValue: "1"
                  })(
                    <Select style={{width: 200}}>
                      <Option value="1">指定停车点</Option>
                      <Option value="2">禁停区</Option>
                    </Select>
                  ) }
                  
                </FormItem>
              </Form>
            </div>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);

