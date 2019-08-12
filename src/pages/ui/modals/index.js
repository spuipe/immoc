import React, { Component } from 'react';
import {Card,Button,Radio,Modal} from "antd";

export default class Modals extends Component {
    constructor (props){
        super(props);

        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            loading2: false
        }
    }

    handlerOpen= (flag)=>{
        console.log(flag);
       this.setState({
           [flag]: true
       })
    }

    handlerConfirm = (type)=>{
        Modal[type]({
            title: "确认",
            content: "你确认对react熟？？",
            onOk (){
                console.log("OK");
            },
            onCancel (){
                console.log("cancel");
            }
        })
    }

    render (){
        return (
            <div>
              <Card title="基础模态框">
                 <Button type="primary" onClick={()=>this.handlerOpen("showModal1")}>Open</Button>
                 <Button type="primary" onClick={()=>this.handlerOpen("showModal2")}>自定义页脚</Button>
                 <Button type="primary" onClick={()=>this.handlerOpen("showModal3")}>顶部20px弹框</Button>
                 <Button type="primary" onClick={()=>this.handlerOpen("showModal4")}>水平垂直居中</Button>
              </Card>
              <Card title="信息确认框">
                 <Button type="primary" onClick={()=>this.handlerConfirm("confirm")}>confirm</Button>
                 <Button type="primary" onClick={()=>this.handlerConfirm("info")}>info</Button>
                 <Button type="primary" onClick={()=>this.handlerConfirm("success")}>Success</Button>
                 <Button type="primary" onClick={()=>this.handlerConfirm("warning")}>Warning</Button>
              </Card>

              <Modal title="React" visible={this.state.showModal1} onCancel={()=>{this.setState({showModal1:false})}} onOk={()=>{this.setState({showModal1:false})}}>
                <p>React犀利1</p>
              </Modal>
              <Modal title="React" visible={this.state.showModal2} onCancel={()=>{this.setState({showModal2:false})}} onOk={()=>{this.setState({showModal2:false})}} footer={[
                  <Button key="back" onClick={()=>this.setState({showModal2: false})}>back</Button>,
                  <Button key="submit" onClick={()=>{ this.setState({ loading2: true }) }} loading={this.state.loading2}>submit</Button>
              ]}>
                <p>React犀利2</p>
              </Modal>
              <Modal title="React" visible={this.state.showModal3} onCancel={()=>{this.setState({showModal3:false})}} onOk={()=>{this.setState({showModal3:false})}} style={{top: 200}}>
                <p>React犀利3</p>
              </Modal>
              <Modal title="React" visible={this.state.showModal4} onCancel={()=>{this.setState({showModal4:false})}} onOk={()=>{this.setState({showModal4:false})}}>
                <p>React犀利4</p>
              </Modal>
            </div>
        );
    }
}

