import React from "react";
import {Tabs,Button,Card,Icon} from "antd"

export default class Tab extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            panes: [
                { title: "Tab1",content: "Tab1",key: "1",icon: "apple" },
                { title: "Tab2",content: "Tab2",key: "2",icon: "android" },
                { title: "Tab3",content: "Tab3",key: "3",icon: "android" },
            ]
        }
    }

    render (){
        const icon1 = <span><Icon type="apple"/>Tab1</span>
        const icon2 = <span><Icon type="android"/>Tab2</span>
        return (
            <div>
              <Card title="Tab页">
                <Tabs  defaultActiveTabKey="2">
                  <Tabs.TabPane tab={icon1} key="1">标签页1</Tabs.TabPane>
                  <Tabs.TabPane tab={icon2} key="2">标签页2</Tabs.TabPane>
                </Tabs>
              </Card>

              <Card title="Tab页">
                <Tabs  defaultActiveTabKey="2">
                  {this.state.panes.map((pane)=>{
                    return (<Tabs.TabPane tab={<span><Icon type={pane.icon}/>{pane.title}</span>} key={pane.key}>{pane.content}</Tabs.TabPane>);
                  })}
                </Tabs>
              </Card>
            </div>
        );
    }
}
