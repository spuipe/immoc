import React from "react";
import { Card } from "antd";
import echartTheme from "../themeLight";
import ReactEcharts from "echarts-for-react";
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
// 导入饼图
import "echarts/lib/chart/pie";
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
            title: { text: "用户骑行订单",x: "center" },
            legend: { orient: "vertical",right: 10,top: 20,data: ["周一","周二","周三","周四","周五","周六","周日"] },
            series: [
                { 
                    name: "订单量",
                    type: "pie",
                    data: [
                        { value: 1000,name: "周一" },
                        { value: 2000,name: "周二" },
                        { value: 2200,name: "周三" },
                        { value: 1500,name: "周四" },
                        { value: 600,name: "周五" },
                        { value: 3200,name: "周六" },
                        { value: 2600,name: "周日" },
                    ] }
            ],
            tooltip: { trigger: "item",formatter: "{a}<br/> {b}:{c}({d}%)" },
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title: { text: "用户骑行订单",x: "center" },
            legend: { orient: "vertical",right: 10,top: 20,data: ["周一","周二","周三","周四","周五","周六","周日"] },
            series: [
                { 
                    name: "订单量",
                    type: "pie",
                    radius: ["30%","70%"],  // 设置环形图   ["内环","外环"]
                    data: [
                        { value: 1000,name: "周一" },
                        { value: 2000,name: "周二" },
                        { value: 2200,name: "周三" },
                        { value: 1500,name: "周四" },
                        { value: 600,name: "周五" },
                        { value: 3200,name: "周六" },
                        { value: 2600,name: "周日" },
                    ]
                }
            ],
            tooltip: { trigger: "item",formatter: "{a}<br/> {b}:{c}({d}%)" },
        }
        return option;
    }

    getOption3 = ()=>{
        let option = {
            title: { text: "用户骑行订单",x: "center" },
            legend: { orient: "vertical",right: 10,top: 20,data: ["周一","周二","周三","周四","周五","周六","周日"] },
            series: [
                { 
                    name: "订单量",
                    type: "pie",
                    roseType: "radius",
                    data: [
                        { value: 1000,name: "周一" },
                        { value: 2000,name: "周二" },
                        { value: 2200,name: "周三" },
                        { value: 1500,name: "周四" },
                        { value: 600,name: "周五" },
                        { value: 3200,name: "周六" },
                        { value: 2600,name: "周日" },
                    ].sort((a,b)=>{return a.value-b.value;}) 
                }
            ],
            tooltip: { trigger: "item",formatter: "{a}<br/> {b}:{c}({d}%)" },
        }
        return option;
    }

    render (){
        return (
            <div>
              <Card title="饼图表之一">
                 <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}} />
              </Card>
              <Card title="饼图表之二" >
                 <ReactEcharts  option={this.getOption2()} theme="Imooc" style={{marginTop: 10,height: 500}} />
              </Card>
              <Card title="饼图表之三" >
                 <ReactEcharts  option={this.getOption3()} theme="Imooc" style={{marginTop: 10,height: 500}} />
              </Card>
            </div>
        );
    }
}
