import React from "react";
import { Card,Button,Modal,Form,Input,Radio,DatePicker,Select } from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ETable from "../../components/ETable";
import BaseForm from "../../components/BaseForm";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            isVisible: false
        }
    }

    formList = [
        {
            type: "INPUT",
            label: "用户名",
            field: "user_name",
            placeholder: "请输入用户名称",
            width:80
        },
        {
            type: "INPUT",
            label: "手机号",
            field: "user_mobile",
            placeholder: "请输入手机号",
            width: 80
        },
        {
            type: "datepicker",
            label: "请选择入职日期",
            field: "user_date",
            placeholder: "请选择日期"
        }
    ]

    componentWillMount(){
        this.requestList();
    }

    filterSelect = (params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        axios.requrestList(this,"/user/list",this.params);
    }

    handleOperate = (type)=>{
        let item = this.state.selectItem;
        let _this = this;
        if(type == "create"){
            this.setState({
                type,isVisible: true,title: "创建员工"
            })
        }else if(type == "edit"){
            if(!item){
                Modal.info({ title: "提示",content: "请选择一个用户" })
                return;
            }
            this.setState({
                type,isVisible: true,title: "编辑员工",userInfo: item
            })
        }else if(type == "detail"){
            this.setState({
                type,isVisible: true,title: "员工详情",userInfo: item
            });
        }else{
            if(!item){
                Modal.info({ title: "提示",content: "请选择一个用户" })
                return;
            }
            Modal.confirm({
                title: "确认删除",
                content: "是否删除当前员工",
                onOk (){
                    axios.ajax({ url: "/user/delete",data: { params: {id:item.id} } }).then((res)=>{
                        if(res.code == 0){
                            _this.setState({ isVisible: false })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({ url: type== "create" ? "/user/add" : "/user/edit",data: {params: data} },true).then((res)=>{
            if(res.code == 0){
                this.setState({ isVisible: false })
                this.requestList();
                this.userForm.props.form.resetFields();
            }
        })
    }

    render (){
        const columns = [
            { title: "id",dataIndex: "id" },
            { title: "用户名",dataIndex: "username" },
            { title: "性别",dataIndex: "sex",render(sex){
                return sex == 1 ? "男" : "女";
            } },
            { title: "状态",dataIndex: "state",render(state){
                return { "1": "Vue","2": "React","3": "Angular","4": "FLutter","5": "Elerton" }[state];
            } },
            { title: "爱好",dataIndex: "interest",render(state){
                return { "1": "篮球","2": "足球","3": "排球","4": "波波球","5": "大球","6": "小球","7": "美球","8": "溜溜球" }[state];
            } },
            { title: "生日",dataIndex: "birthday" },
            { title: "联系地址",dataIndex: "address" },
            { title: "早起时间",dataIndex: "time" },
        ];

        let footer = {};
        if(this.state.type == "detail"){
            footer = { footer: null }
        }

        return (
            <div>
               <Card><BaseForm formList={this.formList} handleSelect={this.filterSelect}/></Card>
               <Card style={{marginTop: 10}}>
                  <Button type="primary" icon="plus" style={{marginRight: 10}} onClick={()=>this.handleOperate("create")}>创建员工</Button>
                  <Button type="primary" icon="edit" style={{marginRight: 10}} onClick={()=>this.handleOperate("edit")}>编辑员工</Button>
                  <Button type="primary" style={{marginRight: 10}} onClick={()=>this.handleOperate("details")}>员工详情</Button>
                  <Button type="primary" icon="delete" style={{marginRight: 10}} onClick={()=>this.handleOperate("delete")}>删除员工</Button>
               </Card>

               <div>
                  <ETable columns={columns} dataSource={this.state.list} pagination={false} bordered selectedRowKeys={this.state.selectedRowKeys} selectItem={this.state.selectItem} updateSelectedItem={Utils.updateSelectedItem.bind(this)}/>
               </div>

               <Modal title={this.state.title} visible={this.state.isVisible} onOk={this.handleSubmit} onCancel={()=>{this.setState({isVisible:false});this.userForm.props.form.resetFields();}} width={600}>
                 <UserForm type={this.state.type} wrappedComponentRef={(inst)=>this.userForm = inst} userInfo={this.state.userInfo} { ...footer }/>
               </Modal>
            </div>
        );
    }
}


class UserForm extends React.Component{

    getState = (state)=>{
        return { "1": "篮球","2": "足球","3": "排球","4": "波波球","5": "大球","6": "小球","7": "美球","8": "溜溜球" }[state];
    }

    render (){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
               <FormItem label="用户名" {...formItemLayout}>
                  {
                      type == "detail" ? userInfo.username :
                      getFieldDecorator("user_name",{
                          initialValue: userInfo.username
                      })(
                          <Input type="text" placeholder="请输入用户名"/>
                      )
                  }
               </FormItem>
               <FormItem label="性别" {...formItemLayout}>
                  {
                    type == "detail" ? userInfo.sex==1?'男':'女' :
                      getFieldDecorator("sex",{
                        initialValue: userInfo.sex
                      })(
                          <RadioGroup>
                             <Radio value="1">男</Radio>
                             <Radio value="2">女</Radio>
                          </RadioGroup>
                      )
                  }
               </FormItem>
               <FormItem label="状态" {...formItemLayout}>
                  {
                    type == "detail" ? this.getState(userInfo.status) :
                      getFieldDecorator("status",{
                        initialValue: userInfo.status
                      })(
                         <Select>
                            <Option value="1">咸鱼</Option>
                            <Option value="2">飞鱼</Option>
                            <Option value="3">Vue</Option>
                            <Option value="4">React</Option>
                            <Option value="5">Angular</Option>
                         </Select>
                      )
                  }
               </FormItem>
               <FormItem label="生日" {...formItemLayout}>
                  {
                    type == "detail" ? userInfo.birthday :
                      getFieldDecorator("birthday",{
                        initialValue: userInfo.moment(userInfo.birthday)
                      })(
                         <DatePicker/>
                      )
                  }
               </FormItem>
               <FormItem label="联系地址" {...formItemLayout}>
                  {
                    type == "detail" ? userInfo.address :
                      getFieldDecorator("address",{
                        initialValue: userInfo.address
                      })(
                         <TextArea rows={3} placeholder="请输入联系地址"/>
                      )
                  }
               </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);
