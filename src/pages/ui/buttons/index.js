import React, { Component } from 'react';
import {Card,Button,Radio} from "antd";


class Buttons extends Component {

  hanleCloseing = ()=>{
    console.log("gg");
  }
  render() {
    return (
      <div>
        <Card title="基础按钮">
          <Button type="primary">Imooc</Button>
          <Button >Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="图形按钮">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>  
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">搜索</Button>
        </Card>
        <Card title="Loading按钮">
          <Button icon="plus" loading={true}>确定</Button>
          <Button type="primary" shape="circle" loading={true}></Button>
          <Button loading={true}>点击加载</Button>
          <Button shape="circle" loading={true}></Button>          
          <Button onClick={this.hanleCloseing.bind(this)}>关闭</Button>
        </Card>
        <Card title="按钮组">
          <Button.Group >
            <Button icon="left">返回</Button>
            <Button icon="right">前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸">
           <Radio.Group >
             <Radio value="small">小</Radio>
             <Radio value="default">中</Radio>
             <Radio value="large">大</Radio>
           </Radio.Group>
           <Button ></Button>
        </Card>
      </div>
    );
  }
}

export default Buttons;
