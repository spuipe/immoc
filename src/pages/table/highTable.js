import React from "react";
import { Card,Table, Modal,Button,message,Badge } from "antd";
import axios from "../../axios/index";
import Utils from "../../utils/utils";

export default class HighTable extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            dataSource2: [],
            sortOrder: ""
        };
    }

    params = {
        page: 1
    }

    componentWillMount (){
        const dataSource = [
            { id: "0",userName: "飞",sex: "1",state: "1",interest: "1",birthday: "2008-12-12",address: "广州市海珠区飞飞街道",time: "09:00" },
            { id: "1",userName: "飞啊",sex: "1",state: "1",interest: "1",birthday: "2008-12-12",address: "广州市海珠区飞飞街道",time: "09:00" },
            { id: "2",userName: "啊飞",sex: "1",state: "1",interest: "1",birthday: "2008-12-12",address: "广州市海珠区飞飞街道",time: "09:00" },
            { id: "3",userName: "飞飞啊",sex: "1",state: "1",interest: "1",birthday: "2008-12-12",address: "广州市海珠区飞飞街道",time: "09:00" }
        ];
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({ dataSource })

        this.request();
    }

    request = ()=>{
        let _this = this;
        axios.ajax({ url: "/table/high/list",data: {params: {page: this.params.page},isShowLoading: true} }).then((res)=>{
            if(res.code == "0"){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({ dataSource2: res.result.list,pagination: Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    this.request();
                }) });
            }
        })
    }

    handlerChange = (pagination, filters, sorter)=>{
        this.setState({ sortOrder: sorter.order })
    }

    handlerDelete = (item)=>{
        Modal.confirm({
            title: "提示",
            content: "确认要删除吗",
            okText: "确认",
            cancelText: "取消",
            onOk: ()=>{ message.success("删除成功") }
        })
    }

    render (){
        let _this = this;
        const columns = [
            { title: "id",dataIndex: "id",width: 80 },
            { title: "用户名",dataIndex: "userName",width: 80 },
            { title: "性别",dataIndex: "sex",width: 80,render (sex){
                return sex == 1 ? "男" : "女"
            } },
            { title: "状态",dataIndex: "state",width: 80,render(state) {
                let config = { '1': "咸鱼",'2': "三文鱼",'3': "金枪鱼",'4': "希鲮鱼",'5': "北极贝" };
                return config[state];
            }, },
            { title: "爱好",dataIndex: "interest",width: 80,render (interest){
                let config = { '1': "游泳",'2': "打篮球",'3': "踢足球",'4': "跑步",'5': "踩单车",'6': "引体向上",'7': "拉伸",'8': "举重" };
                return config[interest];
            } },
            { title: "生日",dataIndex: "birthday",width: 120 },
            { title: "地址",dataIndex: "address",width: 120 },
            { title: "早起时间",dataIndex: "time",width: 80 },
        ];

        const columns2 = [
            { title: "id",dataIndex: "id",width: 80,fixed: "left" },
            { title: "用户名",dataIndex: "userName",width: 80,fixed: "left" },
            { title: "性别",dataIndex: "sex",width: 80,render (sex){
                return sex == 1 ? "男" : "女"
            } },
            { title: "状态",dataIndex: "state",width: 80,render(state) {
                let config = { '1': "咸鱼",'2': "三文鱼",'3': "金枪鱼",'4': "希鲮鱼",'5': "北极贝" };
                return config[state];
            }, },
            { title: "爱好",dataIndex: "interest",width: 80,render (interest){
                let config = { '1': "游泳",'2': "打篮球",'3': "踢足球",'4': "跑步",'5': "踩单车",'6': "引体向上",'7': "拉伸",'8': "举重" };
                return config[interest];
            } },
            { title: "生日",dataIndex: "birthday",width: 120 },
            { title: "生日",dataIndex: "birthday1",width: 120 },
            { title: "生日",dataIndex: "birthday2",width: 120 },
            { title: "早起时间",dataIndex: "time",width: 80,fixed: "right" },
        ];

        const columns3 = [
            { title: "id",dataIndex: "id" },
            { title: "用户名",dataIndex: "userName" },
            { title: "性别",dataIndex: "sex",render (sex){
                return sex == 1 ? "男" : "女"
            } },
            { title: "年龄",dataIndex: "age",sortOrder: this.state.sortOrder,sorter: (a,b)=>{
               return a.age-b.age;
            } },
            { title: "状态",dataIndex: "state",render(state) {
                let config = { '1': "咸鱼",'2': "三文鱼",'3': "金枪鱼",'4': "希鲮鱼",'5': "北极贝" };
                return config[state];
            }, },
            { title: "爱好",dataIndex: "interest",render (interest){
                let config = { '1': <Badge status="success" text="游泳"/>,'2': <Badge status="processing" text="打篮球"/>,'3': <Badge status="warning" text="踢足球"/>,'4': <Badge status="error" text="跑步"/>,'5': <Badge status="default" text="踩单车"/>,'6': <Badge status="warning" text="引体向上"/>,'7': <Badge status="default" text="拉伸"/>,'8': <Badge status="success" text="举重"/> };
                return config[interest];
            } },
            { title: "生日",dataIndex: "birthday" },
            { title: "地址",dataIndex: "address" },
            { title: "早起时间",dataIndex: "time" },
            { title: "操作",render (text,item){
                return <a href="javascript:;" onClick={()=>_this.handlerDelete(item)}>删除</a>
            } },
        ];
        return (
            <div>
              <Card title="头部固定表格">
                <Table dataSource={this.state.dataSource2} columns={columns} bordered pagination={false} rowKey="id" scroll={{ y: 240 }}></Table>
              </Card>

              <Card title="左侧固定表格" style={{ marginTop: "20px" }}>
                  <Table dataSource={this.state.dataSource2} columns={columns2} bordered pagination={false} rowKey="id" scroll={{ x: 1050 }}></Table>
              </Card>

              <Card title="表格排序" style={{ marginTop: "20px" }}>
                  <Table dataSource={this.state.dataSource2} columns={columns3} bordered pagination={false} rowKey="id" onChange={this.handlerChange}></Table>
              </Card>
            </div>
        );
    }
}