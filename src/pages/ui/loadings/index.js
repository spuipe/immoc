import React from "react";
import {Card,Button,Spin,Icon,Alert} from "antd";

export default class Loadings extends React.Component {

    constructor (props){
        super(props);

        this.state = {}
    }

    render (){
        const icon1 = <Icon type="loading" style={{ fontSize: 26 }} spin></Icon>
        return (
            <div>
              <Card title="Spin用法">
                <Spin size="small"></Spin>
                <Spin size="default"></Spin>
                <Spin size="large"></Spin>
                <Spin size="large" indicator={icon1}></Spin>
              </Card>
              <Card title="内容遮罩">
                <Alert message="React" description="React犀利啦" type="warning"></Alert>
                <Spin tip="加载中"><Alert message="React" description="React犀利啦" type="success"></Alert></Spin>
                <Spin tip="加载中" indicator={icon1}><Alert message="React" description="React犀利啦" type="success"></Alert></Spin>
              </Card>
            </div>
        );
    }
}

