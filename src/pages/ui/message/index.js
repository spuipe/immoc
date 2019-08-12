import React from "react";
import {message,Button,Card} from "antd"

export default class Message extends React.Component {

    componentWillMount (){
        message.config({ top:100,duration: 4,maxCount: 2 })
    }
    openMeaage = (type)=>{
        message[type]("又出工资啦")
    }

    render (){
        return (
            <div>
              <Card title="全局提示框">
                <Button type="primary" onClick={()=>this.openMeaage("success")}>Success</Button>
                <Button type="primary" onClick={()=>this.openMeaage("info")}>Info</Button>
                <Button type="primary" onClick={()=>this.openMeaage("warning")}>Warning</Button>
                <Button type="primary" onClick={()=>this.openMeaage("error")}>Error</Button>
              </Card>
            </div>
        );
    }
}
