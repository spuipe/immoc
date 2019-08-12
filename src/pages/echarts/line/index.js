import React from "react";
import { Card } from "antd";
import echartTheme from "../echartTheme";
import ReactEcharts from "echarts-for-react";
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
// 导入饼图
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

export default class Line extends React.Component{

    componentWillMount(){
        echarts.registerTheme("Imooc",echartTheme);  // render 前注入
    }

    getOption = ()=>{
        let option = {
            title: { text: "用户骑行订单" },
            legeng: {},
            tooltip: { trigger: "axis" },
            series: {
                name: "订单量",
                type: "line",
                data: [1000,2000,3500,2200,1800,900,1700]
            },
            yAxis: { type: "value" },
            xAxis: { data: ["周一","周二","周三","周四","周五","周六","周日"] }
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title: { text: "用户骑行订单" },
            legend: { data: ["青桔订单量","摩拜订单量","哈喽订单量"] },
            tooltip: { trigger: "axis" },
            series: [
                {name: "青桔订单量", type: "line", data:[1000,2000,3500,2200,1800,900,1700]},
                {name: "摩拜订单量", type: "line", data:[2000,1500,3500,1890,1820,960,3200]},
                {name: "哈喽订单量", type: "line", data:[1100,1200,1730,3100,1750,1200,2600]},
            ],
            yAxis: { type: "value" },
            xAxis: { data: ["周一","周二","周三","周四","周五","周六","周日"] }
        }
        return option;
    }

    getOption3 = ()=>{
        let option = {
            title: { text: "用户骑行订单" },
            legeng: {},
            tooltip: { trigger: "axis" },
            series: {
                name: "订单量",
                type: "line",
                data: [1000,2000,3500,2200,1800,900,1700],
                areaStyle: {}
            },
            yAxis: { type: "value" },
            xAxis: { type: "category",boundaryGap: true,data: ["周一","周二","周三","周四","周五","周六","周日"] }
        }
        return option;
    }

    render (){
        return (
            <div>
               <Card title="折线图之一">
                 <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}} />                  
               </Card>
               <Card title="折线图之二">
                 <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500,marginTop: 10}} />      
               </Card>
               <Card title="折线图之三">
                 <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500,marginTop: 10}} />      
               </Card>
            </div>
        );
    }
}

