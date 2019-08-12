import React from "react";
import {notification,Button,Card} from "antd"

export default class Notice extends React.Component{

    openNotification = (type,location)=>{
        notification[type]({
            message: "出工资了",
            description: "这个月工资很多",
            placement: location || "topRight"
        })
    }

    render (){
        return (
            <div>
              <Card title="通知提醒框">
                <Button type="primary" onClick={()=>this.openNotification("success")}>Success</Button>
                <Button type="primary" onClick={()=>this.openNotification("info")}>Info</Button>
                <Button type="primary" onClick={()=>this.openNotification("warning")}>Warning</Button>
                <Button type="primary" onClick={()=>this.openNotification("error")}>Error</Button>
              </Card>
              <Card title="通知提醒框(选择位置)">
                <Button type="primary" onClick={()=>this.openNotification("success","topLeft")}>Success</Button>
                <Button type="primary" onClick={()=>this.openNotification("info","topRight")}>Info</Button>
                <Button type="primary" onClick={()=>this.openNotification("warning","bottomLeft")}>Warning</Button>
                <Button type="primary" onClick={()=>this.openNotification("error","bottomRight")}>Error</Button>
              </Card>
            </div>
        );
    }
}
