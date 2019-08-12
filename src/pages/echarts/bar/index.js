import React from "react";
import { Card } from "antd";
import echartTheme from "../echartTheme";
import ReactEcharts from "echarts-for-react";
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
// 导入柱形图
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

export default class Bar extends React.Component{

    componentWillMount(){
        echarts.registerTheme("Imooc",echartTheme);  // render 前注入
    }

    getOption = ()=>{
        let option = {
            title: { text: "用户骑行订单" },
            xAxis: { data: ["周一","周二","周三","周四","周五","周六","周日"] },
            yAxis: { type: "value" },
            series: [{ name: "订单量",type: "bar",data: [1000,2000,1500,3000,2000,1200,800] }],
            tooltip: { trigger: "axis" },  // 鼠标移上去时显示啥玩意
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title: { text: "用户骑行订单" },
            xAxis: { data: ["周一","周二","周三","周四","周五","周六","周日"] },
            yAxis: { type: "value" },
            series: [
                { name: "摩拜",type: "bar",data: [1000,2000,3000,5500,7200,11500,20000] },
                { name: "青桔",type: "bar",data: [1000,2000,4500,5500,6600,8700,18000] },
                { name: "哈喽",type: "bar",data: [2050,2090,3600,7600,9900,12000,18900] },
            ],
            tooltip: { trigger: "axis" },  // 鼠标移上去时显示啥玩意
            legend: { data: ["摩拜","青桔","哈喽"] }, // 导航条名字和颜色
        }
        return option;
    }

    render (){
        return (
            <div>
              <Card title="柱形图表之一">
                 <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}} />
              </Card>
              <Card title="柱形图表之一" >
                 <ReactEcharts  option={this.getOption2()} theme="Imooc" style={{marginTop: 10,height: 500}} />
              </Card>
            </div>
        );
    }
}
