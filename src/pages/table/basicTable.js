import React from "react";
import { Card,Table, Modal,Button,message } from "antd";
import axios from "../../axios/index";
import Utils from "../../utils/utils";

export default class BasicTable extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            dataSource2: []
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
        axios.ajax({ url: "/table/list",data: {params: {page: this.params.page},isShowLoading: true} }).then((res)=>{
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

    onRowClick = (record,index)=>{  // record 选中项的属性   index 选中项的索引
        let selectKey = [index+1];
        this.setState({ selectedRowKeys: selectKey,selectedItem: record });
    }

    handleDelete= ()=>{
        let ids = [];
        this.state.selectedRows.map((item)=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title: "提示",
            content: `确定要删除这些数据吗？${ids.join(",")}`,
            onOk: ()=>{
                message.success("删除成功");
            }
        });
    }

    render (){
        const columns = [
            { title: "id",dataIndex: "id" },
            { title: "用户名",dataIndex: "userName" },
            { title: "性别",dataIndex: "sex",render (sex){
                return sex == 1 ? "男" : "女"
            } },
            { title: "状态",dataIndex: "state",render(state) {
                let config = { '1': "咸鱼",'2': "三文鱼",'3': "金枪鱼",'4': "希鲮鱼",'5': "北极贝" };
                return config[state];
            }, },
            { title: "爱好",dataIndex: "interest",render (interest){
                let config = { '1': "游泳",'2': "打篮球",'3': "踢足球",'4': "跑步",'5': "踩单车",'6': "引体向上",'7': "拉伸",'8': "举重" };
                return config[interest];
            } },
            { title: "生日",dataIndex: "birthday" },
            { title: "地址",dataIndex: "address" },
            { title: "早起时间",dataIndex: "time" },
        ];

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = { type: "radio",selectedRowKeys };
        const rowCheckSelection = { type: "checkbox",selectedRowKeys,onChange: (selectedRowKeys,selectedRows)=>{
            this.setState({ selectedRowKeys,selectedRows })
        } };
        return (
            <div>
              <Card title="基础表格">
                <Table dataSource={this.state.dataSource} columns={columns} bordered pagination={false} rowKey="id"></Table>
              </Card>

              <Card title="动态数据渲染表格" style={{ marginTop: "20px" }}>
                <Table dataSource={this.state.dataSource2} columns={columns} bordered pagination={false} rowKey="id"></Table>
              </Card>

              <Card title="Mock--单选" style={{ marginTop: "20px" }}>
              <Button onClick={this.handleDelete}>删除</Button>
                <Table dataSource={this.state.dataSource2} columns={columns} bordered pagination={false} rowKey="id" rowSelection={rowCheckSelection} onRow={(record,index) => {
                    return {
                      onClick: event => {this.onRowClick(record,index)}, // 点击行
                    };
                  }}></Table>
              </Card>

              <Card title="Mock--分页" style={{ marginTop: "20px" }}>
                <Table dataSource={this.state.dataSource2} columns={columns} bordered pagination={this.state.pagination} rowKey="id" onRow={(record,index) => {
                    return {
                      onClick: event => {this.onRowClick(record,index)}, // 点击行
                    };
                  }}></Table>
              </Card>
            </div>
        );
    }
}

